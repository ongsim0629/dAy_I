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
router.get("/", (req, res) => {
  //GET 메소드라, body X; params O;
  const id = req.params.id;
  const date = req.params.date;

  /*
  try {
    var check = jwt.verify(token, "secretKey");
    if (check) {
      console.log("token 검증", check.user_id);
    }
  } catch {
    console.log("token 검증 오류");
  }
  //check.user_id로 user_id 받아왔음
  */

  //var query = "select * from diary where = ?";
  const exec = conn.query(
    "select * from diary where diary_writer_id = ? AND diary_write_date = ?;",
    [id, date],
    (err, result) => {
      conn.release();
      console.log("실행된 SQL: " + exec.sql);

      if (err) {
        console.log("SQL 실행 시, 오류 발생");
        console.dir(err);
        res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
        res.write("<h2>SQL 실행 실패;</h2>");
        res.end();
        res.status(404).send("오류");
        return;
      } else {
        if (result.length > 1) {
          console.log("하루에 일기 1개 초과 (2개 이상)");
          console.dir(err);
          res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
          res.write("<h2>일기 날짜 중복;하루에 일기 1개 초과 (2개 이상)</h2>");
          res.end();
          res.status(404).send("오류");
          return;
        }
        console.log("쿼리문 성공");
        console.dir(result);
        res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
        res.send({
          diary_writer_id: result[0].diary_writer_id,
          diary_write_date: result[0].diary_write_date,
          diary_title: result[0].diary_title,
          diary_content: result[0].diary_content,
          diary_keyword: result[0].diary_keyword,
          diary_category_site: result[0].diary_category_site,
          diary_emotion: result[0].diary_emotion,
          diary_playlist: result[0].diary_playlist,
          diary_summary: result[0].diary_summary,
        });
        res.end();
      }
    }
  );
});

module.exports = router;
