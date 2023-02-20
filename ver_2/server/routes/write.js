var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const db = require("../../server/config/db.js");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

var request = require("request");

//date(String), title(), content, (token) 전달받음
router.post("/", (req, res) => {
  console.log("/members/test/write 호출됨");
  const date = req.body.date;
  const title = req.body.title;
  const content = req.body.content;
  const token = req.body.token;
  const yearMonth = date.substring(0,8) + "__";

  try {
    var check = jwt.verify(token, "secretKey");
    if (check) {
      console.log("token 검증", check.user_id);
    }
  } catch {
    console.log("token 검증 오류");
  }

  const id = check.user_id;

  var json = {};
  json.token = token;
  json.id = id;

  var query = "select * from diary";
  console.log("date", date);
  console.log("title", title);
  console.log("content", content);

  db.query(
    "INSERT INTO diary (DIARY_WRITER_ID, DIARY_WRITE_DATE, DIARY_TITLE, DIARY_CONTENT) VALUES (?, ?, ?, ?);",
    [check.user_id, date, title, content],
    function (error, results, fields) {
      if (error) throw error;
    }
  );

  // FLASK로 일기 내용 보내기
  const ModelResult = (callback) => {
    const options = {
      method: "POST",
      uri: "http://127.0.0.1:4000/sendmodeltext",
      qs: {
        text: content,
      },
    };
    request(options, function (err, res, body) {
      callback(undefined, {
        result: body,
      });
    });
  };

  ModelResult((err, { result } = {}) => {
    let json = JSON.parse(result); // 플라스크에서 받은 json 값

    //플레이리스트 id추출 부분==================
    let emotion = json.emotion; //받은 json에서 감정 한개 받음
    let summary = json.summ;

    db.query(
      "SELECT PLAYLIST_ID, PLAYLIST_TITLE FROM playlist WHERE PLAYLIST_EMOTION = ? ORDER BY RAND() LIMIT 1;",
      emotion,
      function (error, results, fields) {
        if (error) throw error;
        console.log("감정: ", emotion);
        console.log("플리id: ", results[0].PLAYLIST_ID); // results[0].PLAYLIST_ID 가 랜덤으로 뽑은 플레이리스트 ID
        db.query(
          "UPDATE diary SET DIARY_EMOTION = ?,DIARY_PLAYLIST = ?, DIARY_SUMMARY = ? WHERE DIARY_WRITER_ID = ? and DIARY_WRITE_DATE = ?;",
          [emotion, results[0].PLAYLIST_ID, summary, check.user_id, date],
          function (error, results, fields) {
            if (error) throw error;
          }
        );
      }
    );

    //키워드에 대한 카테고리 추출===============
    let key_arr = [];
    let key_arr_sum = []; //sql 쿼리문 깔끔하게 담기 위해 합칠 임시 배열
    key_arr = json.key_list; // flask 에서 받은 키워드를 리스트로 받음
    var len = 10 - key_arr.length; // 키워드가 10개 미만 뽑혔을때를 대비한 길이 우선 지정
    for (var i = 0; i < len; i++) {
      //키워드 10개 미만이면 0으로 10개에 맞게 채워놓음
      key_arr.push("0");
    }
    key_arr_sum = key_arr.concat(key_arr);

    db.query(
      "SELECT * FROM keyword where keyword in (?,?,?,?,?,?,?,?,?,?) ORDER BY FIELD(keyword,?,?,?,?,?,?,?,?,?,?) limit 1;",
      key_arr_sum,
      function (error, results) {
        if (error) throw error;
        if (results.length > 0) {
          const catego = results[0].CATEGORY;
          console.log("카테고리:" + catego);

          db.query(
            "UPDATE diary SET DIARY_KEYWORD = ? WHERE DIARY_WRITER_ID = ? and DIARY_WRITE_DATE = ?;",
            [results[0].KEYWORD, check.user_id, date],
            function (error, results, fields) {
              if (error) throw error;
            }
          );

          db.query(
            "SELECT SITE_URL FROM categorysite where SITE_CATEGORY = ?;",
            [results[0].CATEGORY],
            function (error, results, fields) {
              if (error) throw error;

              db.query(
                "UPDATE diary SET DIARY_CATEGORY_SITE = ? WHERE DIARY_WRITER_ID = ? and DIARY_WRITE_DATE = ?;",
                [results[0].SITE_URL, check.user_id, date],
                function (error, results, fields) {
                  if (error) throw error;
                }
              );
            }
          );
        } else {
          console.log("No records found.");
        }
      }
    );
  });

  db.query(query, (err, data) => {
    if (!err) {
      console.log("오류X");
      json.data = data;
      console.log(data);
      const exec = db.query(
        "select diary_write_date, diary_summary from diary where diary_writer_id = ? and diary_write_date like ?;",
        [id, yearMonth],
        (err, result) => {
          // sql 오류 시
          if (err) {
            console.log("SQL 실행 시, 오류 발생");
            console.dir(err);
            res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
            res.write("<h2>SQL 실행 실패;</h2>");
            res.status(404).send("오류");
            res.end();
            return;
          } else {
  
            var dataList = [];
            for (var data of result){
              dataList.push(new Date(data.diary_write_date));
            };
            var summaryList = [];
            for (var data of result){
              summaryList.push(data.diary_summary);
            };
            json.dataList = dataList;
            json.summaryList = summaryList;
            
            // sql 성공 시
            res.send(json);
          }
        }
      );
      
    } else {
      console.log("오류");
    }
  });
});
module.exports = router;

/*
[흐름 정리]

home(날짜 선택) (date, token 전달)
-> 일기 없으면(write) (현재)
-> 일기 있으면(diary) ->후에 개발

날짜, token 전달받으면,
token verify해서 user_id 받기
user_id랑 날짜 이용해서 diary 정보 받아옴
1) diary table에 해당 날짜 일기 O
    content 받아와서 뿌려줌
2) diary table에 해당 날짜 일기 X
    빈 페이지
*/
