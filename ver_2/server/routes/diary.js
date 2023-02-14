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
  const date = req.body.date;
  const token = req.body.token;

  try {
    var check = jwt.verify(token, "secretKey");
    if (check) {
      console.log("token 검증", check.user_id);
    }
  } catch {
    console.log("token 검증 오류");
  }
  //check.user_id로 user_id 받아왔음

  var query = "select * from diary where = ?";
  const exec = conn.query(
    "select * from diary where diary_writer_id = ? AND diary_write_date = ?;",
    [check.user_id, date],
    (err, result) => {
      conn.release();
      console.log("실행된 SQL: " + exec.sql);
    }
  );
});
