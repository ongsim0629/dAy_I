const express = require("express");
const mysql = require("mysql");
const path = require("path");
const static = require("serve-static");
const dbconfig = require("./config/database.js");
const connection = mysql.createConnection(dbconfig); // 순전히 /us를 위한 정의부
const port = 3000;
const crypto = require("crypto");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", static(path.join(__dirname, "public")));

// 1. 루트
app.get("/", (req, res) => {
  res.send("Root22");
});

// 2. select test
app.get("/us", (req, res) => {
  connection.query("SELECT * from User", (error, rows) => {
    if (error) throw error;
    console.log("User info is: ", rows);
    res.send(rows);
  });
});

// 3. 회원가입
app.post("/members/new", (req, res) => {
  console.log("/members/new 호출됨 " + req);

  const paramId = req.body.user_id;
  const paramPassword = req.body.user_password;
  const paramPasswordCheck = req.body.user_password_check;

  var salt = Math.round(new Date().valueOf() * Math.random()) + "";
  var hashPassword = crypto
    .createHash("sha512")
    .update(paramPassword + salt)
    .digest("hex");

  pool.getConnection((err, conn) => {
    // 1. sql 연결 문제
    if (err) {
      conn.release();
      console.log("Mysql get connection error");
      res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
      res.write("<h2>DB 서버 연결 실패</h2>");
      res.end();
      return;
    }
    // sql 연결 성공 시
    console.log("데이터베이스 conn");
    /*
    var hash_password;
    crypto.randomBytes(64, (err, salt) => {
      crypto.pbkdf2(
        paramPassword,
        salt.toSring("base64"),
        100000,
        64,
        "sha512",
        (err, key) => {
          console.log(key.toString("base64"));
          hash_password = key.toString("base64");
        }
      );
    });*/
    const exec = conn.query(
      "insert into USERTEST (USER_ID, USER_PASSWORD, salt) values (?, ?, ?);",
      [paramId, hashPassword, salt],
      (err, result) => {
        conn.release();
        console.log("실행된 SQL: " + exec.sql);

        // 2. id 중복 문제
        if (err) {
          console.log("SQL 실행시 오류 발생; id 중복 문제");
          console.dir(err);
          res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
          res.write("<h2>SQL 실행 실패; id 중복 문제</h2>");
          res.end();
          return;
        }

        if (result) {
          //3. pw 불일치 문제
          if (paramPassword != paramPasswordCheck) {
            //conn.release();
            console.log("Password inconsistency");
            res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
            res.write("<h2>비밀번호 불일치</h2>");
            res.end();
            return;
          }

          console.dir(result);
          console.log("insert 성공");

          res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
          res.write("<h2>사용자 추가 성공</h2>");
          res.end();
        } else {
          console.log("insert 실패");

          res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
          res.write("<h2>사용자 추가 실패</h2>");
          res.end();
        }
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
