var express = require('express');
var router = express.Router();
const db = require("../../server/config/db.js");
const crypto = require("crypto");

router.use(express.json())
router.use(express.urlencoded({extended:false}));

process.setMaxListeners(0);
  

router.post('/', (req, res) => {
    //변수 설정
    console.log('/members/login 호출됨')
    const id = req.body.id
    const password = req.body.password
    
    var query = "select salt, user_password from user where user_id='" + id +"';"
    console.log(">>>입력한 아이디: ", id, ", 비밀번호: ", password);

    db.query(query,(err, data) => {
        if(!err) {
            // 결과값이 1보다 작다면(동일한 id 가 없다면)
            if(data.length == 0) {
                console.log('>>>아이디 없어유');
                res.send({ 'msg': '입력하신 id가 일치하지 않습니다.'})
                return;
            } else { // 동일한 id 가 있으면 비밀번호 일치 확인
                console.log('>>>아이디 있어유');
                var salt = data[0].salt;
                var password = data[0].user_password;
                const hash = crypto.createHash('sha512').update(password + salt).digest('hex');
                console.log(hash)
                if (password == hash){
                    console.log("로그인 성공")
                    res.cookie("user", id, {
                        expires : new Date(Date.now() + 900000),
                        httpOnly: true
                    });
            
        } else {
            res.send(err)
        }
    }}
    })
});

module.exports = router;