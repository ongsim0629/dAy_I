var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const db = require("../../server/config/db.js");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

var request = require('request');



//date(String), title(), content, (token) 전달받음
router.post("/", (req, res) => {
  console.log("/members/test/write 호출됨");
  const date = req.body.date;
  const title = req.body.title;
  const content = req.body.content;
  const token = req.body.token;

  try {
    var check = jwt.verify(token, "secretKey");
    if (check) {
      console.log("token 검증", check.user_id);
    }
  } catch {
    console.log("token 검증 오류");
  }

  var query = "select * from diary";
  console.log("date", date);
  console.log("title", title);
  console.log("content", content);

  db.query("INSERT INTO diary (DIARY_WRITER_ID, DIARY_WRITE_DATE, DIARY_TITLE, DIARY_CONTENT) VALUES (?, ?, ?, ?);",['qwe',date,title,content], function (error, results, fields) {
    if (error) throw error;
  });

  // FLASK로 일기 내용 보내기
  const ModelResult  = (callback)=>{
    const options = {
        method: 'POST',
        uri: "http://127.0.0.1:4000/sendmodeltext",
        qs: {
            text: content
        }
    }
    request(options, function (err, res, body) {
        callback(undefined, {
            result:body
        });
    });
  }

  ModelResult((err, {result}={})=>{
    // if(err){
    //     console.log("error!!!!");
    //     res.send({
    //         message: "fail",
    //         status: "fail"
    //     });
    // }
    let json = JSON.parse(result); // 플라스크에서 받은 json 값

    //플레이리스트 id추출 부분==================
    let emotion = json.emotion; //받은 json에서 감정 한개 받음
    db.query("SELECT PLAYLIST_ID, PLAYLIST_TITLE FROM playlist WHERE PLAYLIST_EMOTION = ? ORDER BY RAND() LIMIT 1;",emotion, function (error, results, fields) {
      if (error) throw error;
      console.log('감정: ', emotion);
      console.log('플리id: ', results[0].PLAYLIST_ID); // results[0].PLAYLIST_ID 가 랜덤으로 뽑은 플레이리스트 ID
      db.query("UPDATE diary SET DIARY_EMOTION = ?,DIARY_PLAYLIST = ? WHERE DIARY_WRITER_ID = ? and DIARY_WRITE_DATE = ?;",[emotion,results[0].PLAYLIST_ID,'qwe',date], function (error, results, fields) {
        if (error) throw error;
      });
      
    });

    //키워드에 대한 카테고리 추출===============
    let key_arr = [];
    let key_arr_sum = []; //sql 쿼리문 깔끔하게 담기 위해 합칠 임시 배열
    key_arr = json.key_list; // flask 에서 받은 키워드를 리스트로 받음
    var len = 10 - key_arr.length // 키워드가 10개 미만 뽑혔을때를 대비한 길이 우선 지정

    for(var i = 0; i < len; i++){ //키워드 10개 미만이면 0으로 10개에 맞게 채워놓음
      key_arr.push('0');
    }

    key_arr_sum = key_arr.concat(key_arr)
    db.query("SELECT * FROM keyword where keyword in (?,?,?,?,?,?,?,?,?,?) ORDER BY FIELD(keyword,?,?,?,?,?,?,?,?,?,?) limit 1;",key_arr_sum,function (error, results) {
      if (error) throw error;
      if (results.length > 0) {
        const catego = results[0].CATEGORY
        console.log('카테고리:'+ catego)
        db.query("UPDATE diary SET DIARY_KEYWORD = ? WHERE DIARY_WRITER_ID = ? and DIARY_WRITE_DATE = ?;",[results[0].KEYWORD,'qwe',date], function (error, results, fields) {
          if (error) throw error;
        });
        db.query("SELECT SITE_URL FROM categorysite where SITE_CATEGORY = ?;",[results[0].CATEGORY], function (error, results, fields) {
          if (error) throw error;
          db.query("UPDATE diary SET DIARY_CATEGORY_SITE = ? WHERE DIARY_WRITER_ID = ? and DIARY_WRITE_DATE = ?;",[results[0].SITE_URL,'qwe',date], function (error, results, fields) {
            if (error) throw error;
          });
        });

      } else {
        console.log('No records found.');
      }
    });
  });

  db.query(query, (err, data) => {
    if (!err) {
      console.log("오류X");
    } else {
      console.log("오류");
    }
  });

  function getMyVariable() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT PLAYLIST_ID, PLAYLIST_TITLE FROM playlist WHERE PLAYLIST_EMOTION = "슬픔" ORDER BY RAND() LIMIT 1;';
      db.query(sql, function (error, results, fields) {
        if (error) reject(error);
        const myVariable = results[0].PLAYLIST_ID;
        resolve(myVariable);
      });
    });
  }
  
  // Call the function and output the variable log outside
  getMyVariable().then((myVariable) => {
    console.log(myVariable); // Output: the value of the first row of the "my_column" column in the "mytable" table
  }).catch((error) => {
    console.log(error);
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