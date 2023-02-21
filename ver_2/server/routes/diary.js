/*
[흐름 정리]
1) home에서 날짜 선택 ->
2) write에서 저장 버튼 -> flask 분석 -> 분석 결과 db에 저장 -> diary로 이동(navigate)
//front로 res 보낼 때, 작성한 diary 날짜 보내줌 -> front에서 navigate할 경우, 

[req & res]
req = [token, date]
res = 없어도 될 듯

token, date 가져오면,
token으로 user_id 뽑아내고,
user_id와 date 정보 이용해서 diary 테이블에서 select로 값을 받아와 뿌려주기

아마 get이면, 바로 뿌려주는걸까..?
*/

var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const db = require("../../server/config/db.js");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//date, token 받음
router.post("/", (req, res) => {
  //GET 메소드라, body X; params O;
  //const id = req.body.id;
  const token = req.body.token;
  const date = req.body.date;

  try {
    var check = jwt.verify(token, "secretKey");
    if (check) {
      console.log("token 검증", check.user_id);
    }
  } catch {
    console.log("token 검증 오류");
  }

  db.getConnection((err, conn) => {
    //db 연결 실패 시,
    if (err) {
      console.log("Mysql 연결 실패");
      conn.release(); //커넥션 풀에 커넥션 반환 -> 연결 해제
      res.writeHead("404", { "content-Type": "text/html; charset=utf8" });
      res.write("<h2>DB 서버 연결 실패</h2>");
      res.end();
      return;
    }
    // db 연결 성공 시
    console.log("데이터베이스 conn");

    const exec = conn.query(
      "select * from diary where diary_writer_id = ? AND diary_write_date = ?;",
      [check.user_id, date],
      (err, result) => {
        console.log("실행된 SQL: " + exec.sql);
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
          // sql 성공 시
          // 하루에 일기 1개 초과 시
          if (result.length > 1) {
            console.log("하루에 일기 1개 초과 (2개 이상)");
            console.dir(err);
            res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
            res.write(
              "<h2>일기 날짜 중복;하루에 일기 1개 초과 (2개 이상)</h2>"
            );
            res.status(404).send("오류");
            res.end();
            return;
          }
          /*
          res. 메소드 모음
          - res.writeHead: response 객체의 메소드에서 헤더 정보를 응담에 작성해서 내보내기
          - res.write(''): Header 정보 다음 Body 내용 작성
          - res.end(): 응답종료(내보내기 완료)
          +) res.status
          */

          //오류가 없을 경우
          //console.log("쿼리문 성공");
          //console.dir(result[0]);

          var json = {}; //front로 res 보내줄 data
          json.diary_writer_id = result[0].DIARY_WRITER_ID;
          json.diary_write_date = result[0].DIARY_WRITE_DATE;
          json.diary_title = result[0].DIARY_TITLE;
          json.diary_content = result[0].DIARY_CONTENT;
          json.diary_keyword = result[0].DIARY_KEYWORD;
          json.diary_category_site = result[0].DIARY_CATEGORY_SITE;
          json.diary_emotion = result[0].DIARY_EMOTION;
          json.diary_playlist = result[0].DIARY_PLAYLIST;
          json.diary_summary = result[0].DIARY_SUMMARY;

          var site_url = result[0].DIARY_CATEGORY_SITE;
          var playlist_url = result[0].DIARY_PLAYLIST;
          if (playlist_url == null) {
            json.playlistTitle = "로딩 중입니다. 3초 후 새로고침을 눌러주세요.";
            json.playlistURL = "데이터없음playlistURL";
            json.thumbnailURL = "데이터없음thumbnailURL";
            res.send(json);
            res.end();
          } else {
            const exec = conn.query(
              "select PLAYLIST_URL, PLAYLIST_TITLE from playlist where playlist_id ='" +
                result[0].DIARY_PLAYLIST +
                "';",
              (err, result) => {
                conn.release();
                // sql 오류 시
                if (err) {
                  console.log("SQL 실행 시, 오류 발생");
                  console.dir(err);
                  res.writeHead("200", {
                    "content-Type": "text/html; charset=utf8",
                  });
                  res.write("<h2>SQL 실행 실패;</h2>");
                  res.status(404).send("오류");
                  res.end();
                  return;
                } else {
                  // sql 성공 시
                  // 하루에 일기 1개 초과 시
                  let playlist_url = result[0].PLAYLIST_URL;
                  let thumbnail = playlist_url.substring(32);
                  thumbnail =
                    "https://img.youtube.com/vi/" +
                    thumbnail +
                    "/maxresdefault.jpg";
                  let playlist_title = result[0].PLAYLIST_TITLE;
                  //console.log("다이어리 내용은 : " +first_result[0])
                  //console.log("썸네일 주소는 : " + thumbnail);
                  //console.log("플레이리스트 url은 : " + playlist_url);
                  //console.log("플레이리스트 제목은 : " + playlist_title);
                  json.playlistTitle = playlist_title;
                  json.playlistURL = playlist_url;
                  json.thumbnailURL = thumbnail;
                  //console.log(json);
                  //res.send(json);
                  //res.end();

                  //diary 키워드 부재로 site 추천이 안된 경우 (DB NULL)
                  if (site_url == null) {
                    json.site_title = "추천된 사이트가 없습니다.";
                    res.send(json);
                    res.end();
                  } else {
                    //diary_category_site(site_url) 참고해서 site_title 주기
                    const exec = conn.query(
                      "select SITE_TITLE FROM CATEGORYSITE WHERE SITE_URL = ?;",
                      [site_url],
                      (err, siteResult) => {
                        console.log("실행된 SQL: " + exec.sql);
                        //sql 오류 시
                        if (err) {
                          console.log("SQL 실행 시, 오류 발생");
                          console.dir(err);
                          res.writeHead("200", {
                            "content-Type": "text/html; charset=utf8",
                          });
                          res.write("<h2>SQL 실행 실패;</h2>");
                          res.status(404).send("오류");
                          res.end();
                          return;
                        } else {
                          // sql 성공 시
                          //오류가 없을 경우
                          console.log("사이트 쿼리문 성공");
                          json.site_title = siteResult[0].SITE_TITLE;
                          console.log(json);
                          res.send(json);
                          res.end();
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      }
    );
  });
});

module.exports = router;
