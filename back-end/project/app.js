const express    = require('express')
const mysql      = require('mysql')
const path = require('path')
const static = require('serve-static')
const dbconfig   = require('./config/database.js')
const port = 3000

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : dbconfig.host,
    user     : dbconfig.user,
    password : dbconfig.password,
    database : dbconfig.database
})

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/public', static(path.join(__dirname, 'public')))

app.post('/members/new',(req,res) => {
    console.log('/members/new 호출됨 ' +req)

    const paramId = req.body.user_id;
    const paramPassword = req.body.user_password;

    pool.getConnection((err,conn)=>{
        if(err){
            conn.release();
            console.log('Mysql get connection error');
            res.writeHead('200',{'content-Type':'text/html; charset=utf8'})
            res.write('<h2>DB 서버 연결 실패</h2>')
            res.end();
            return;
        }

        console.log('데이터베이스 conn');
        const exec = conn.query('insert into user (user_id, user_password) values (?,password(?));',
        [paramId,paramPassword],
        (err,result)=>{
            conn.release();
            console.log('실행된 SQL: ' +exec.sql)

            if(err){
                console.log('SQL 실행시 오류 발생')
                console.dir(err);
                res.writeHead('200',{'content-Type':'text/html; charset=utf8'})
                res.write('<h2>SQL 실행 실패</h2>')
                res.end();
                return
            }

            if(result){
                console.dir(result)
                console.log('insert 성공')

                res.writeHead('200',{'content-Type':'text/html; charset=utf8'})
                res.write('<h2>사용자 추가 성공</h2>')
                res.end();
            }
            else {
                console.log('insert 실패')

                res.writeHead('200',{'content-Type':'text/html; charset=utf8'})
                res.write('<h2>사용자 추가 실패</h2>')
                res.end();


            }
        }
        )
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})