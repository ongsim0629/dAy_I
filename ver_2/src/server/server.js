const express = require('express');
const PORT = process.env.PORT || 4000;
const db=require('./config/db.js');
const crypto = require("crypto");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    console.log('/root')
})

// 1. 회원가입 기능
app.post("/members/register", (req, res) => {
    const paramId = req.body.id;
    const paramPassword = req.body.password;
    const paramPasswordCheck = req.body.confirmPassword;
    console.log("받은 데이터 : ", paramId, paramPassword, paramPasswordCheck);
  
    //패스워드 암호화
    var salt = Math.round(new Date().valueOf() * Math.random()) + "";
    var hashPassword = crypto
      .createHash("sha512")
      .update(paramPassword + salt)
      .digest("hex");
  
    // 커넥션 풀에서 커넥션 가져오기
    db.getConnection((err, conn) => {
    
    // 1. sql 연결 문제 -> db 커넥션 문제 발생할 시 실행되는 함수
        // sql 연결 실패 시
        if (err) {
            console.log("Mysql 연결 실패")
            conn.release(); //커넥션 풀에 커넥션 반환 -> 연결 해제
            res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
            res.write("<h2>DB 서버 연결 실패</h2>");
            res.end();
            return;
        }

        // sql 연결 성공 시
        console.log("Mysql 연결 성공");
        // sql query문 삽입 -> ?에 순서대로 대괄호 안의 내용이 삽입됨
        const exec = conn.query(
            "INSERT INTO user (id, password) VALUES (?, ?);",
            //[paramId, hashPassword],
            [paramId, paramPassword],
            //sql query 실행 실패, 혹은 성공할 경우에 대한 코드
            (err, result) => {
                conn.release();
                console.log("실행된 SQL: " + exec.sql);

                // 2. id 중복 문제 => 중복 확인 버튼 클릭 시 중복 여부 확인으로 변경해야댐
                if (err) {
                    console.log("SQL 실행 시 오류 발생; 아이디 중복 문제");
                    console.dir(err);
                    // res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
                    // res.write("<h2>SQL 실행 실패; 아이디 중복 문제</h2>");
                    // res.end();
                    res.status(404).send('중복!! Sorry, we cannot find that!')
                    return;
                }
  
                if (result) {
                    // //3. pw 불일치 문제 => RegisterPage.jsx에서 처리했음
                    // if (paramPassword != paramPasswordCheck) {
                    //     res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
                    //     res.write("<h2>비밀번호 불일치</h2>");
                    //     res.end();
                    //     return;
                    // }
                    console.dir(result);
                    console.log("INSERT 성공");
                    res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
                    res.write("<h2>사용자 추가 성공</h2>");
                    res.end();
                } 
                else {
                    console.log("INSERT 실패");
                    res.writeHead("200", { "content-Type": "text/html; charset=utf8" });
                    res.write("<h2>사용자 추가 실패</h2>");
                    res.end();
                }
            }
        );
    });
});

// 2. 로그인 기능
app.post('/login', (req, res) => {
    //변수 설정
    const id = req.body.id
    const password = req.body.password
    console.log(">>>입력한 아이디: ", id, ", 비밀번호: ", password);

    // 입력된 id와 동일한 id가 mysql에 있는지 확인
    const sql1 = 'SELECT COUNT(*) AS result FROM user WHERE id = ?'
    db.query(sql1, id, (err, data) => {
        if(!err) {
            // 결과값이 1보다 작다면(동일한 id 가 없다면)
            if(data[0].result < 1) {
                console.log('>>>아이디 없어유');
                res.send({ 'msg': '입력하신 id가 일치하지 않습니다.'})
                return;
            } else { // 동일한 id 가 있으면 비밀번호 일치 확인
                console.log('>>>아이디 있어유');
                const sql2 = `SELECT 
                                CASE (SELECT COUNT(*) FROM user WHERE id = ? AND password = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT id FROM user WHERE id = ? AND password = ?)
                                END AS userId
                                , CASE (SELECT COUNT(*) FROM user WHERE id = ? AND password = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT password FROM user WHERE id = ? AND password = ?)
                                END AS userPw`;
                // sql 란에 필요한 parameter 값을 순서대로 기재
                const params = [id, password, id, password, id, password, id, password]
                db.query(sql2, params, (err, data) => {
                    if(!err) {
                        res.send(data[0])
                    } else {
                        res.send(err)
                    }
                })
            }
        } else {
            res.send(err)
        }
    })
});

app.listen(PORT, ()=>{
    console.log(`Server On : http://localhost:${PORT}`)
})

/*
=== 공부 참고용 ===
app.get('/movies',(req,res)=>{
    console.log('/movies')
    db.query("select * from users",(err,data) => { //조건 조회도 가능하겠져
        if(!err) {
            console.log(data) //회원정보 (-> 백엔드쪽임)
            //res.send(data) //응답을 클라이언트!!에게 보내기. 요청한 곳에 data를 다시 보냄.
        }
        else {
            console.log(err)
        }
    })
})

app.get('/movie/:id',(req,res)=>{
    console.log('/movie/:id')
    const id = req.params.id
    console.log(id) //3이 뜰 거임
    //db.query (where)
})

app.get('/movie/:id',(req,res)=>{
    console.log('/movie/:id')
    const id = req.params.id
    console.log(id) //3이 뜰 거임
    //db.query (where)
    
})

// SELECT TEST
app.get("/register", (req, res) => {
    db.query("select * from user",(err,data) => { //조건 조회도 가능하겠져
        if(!err) {
            //console.log(data) //회원정보 (-> 백엔드쪽임)
            res.send(data) //응답을 클라이언트!!에게 보내기. 요청한 곳에 data를 다시 보냄.
*/