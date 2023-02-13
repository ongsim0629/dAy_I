var express = require("express");
var router = express.Router();

//var jwt = require("../node_modules/jsonwebtoken"); //추가

var jwt = require("jsonwebtoken");

const db = require("../../server/config/db.js");
const crypto = require("crypto");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

process.setMaxListeners(0);

router.post("/", (req, res) => {
  //변수 설정
  console.log("/members/login 호출됨");
  const id = req.body.id;
  const password = req.body.password;

  var query =
    "select salt, user_password from user where user_id='" + id + "';";
  console.log(">>>입력한 아이디: ", id, ", 비밀번호: ", password);

  db.query(query, (err, data) => {
    if (!err) {
      // 결과값이 1보다 작다면(동일한 id 가 없다면)
      if (data.length == 0) {
        console.log(">>>아이디 없어유");
        res.send({ msg: "입력하신 id가 일치하지 않습니다." });
        return;
      } else {
        // 동일한 id 가 있으면 비밀번호 일치 확인
        console.log(">>>아이디 있어유");
        var salt = data[0].salt;
        var password_db = data[0].user_password;
        console.log(data[0].salt);
        console.log(data[0].user_password);
        const hash = crypto
          .createHash("sha512")
          .update(password + salt)
          .digest("hex");
        console.log(hash);
        if (password_db == hash) {
          console.log("로그인 성공");

          var token = jwt.sign(
            {
              user_id: id, //Private Claim 자리 (키: 데이터)
            },
            "secretKey", //Signature (비밀키가 들어갈 자리)
            {
              subject: "gyeongInLine jwtToken",
              expiresIn: "60m",
              issuer: "gyeongInLine",
            }
          );

          console.log("토큰 생성", token);

          res.send({ userId: id, token: token });

          //기존 코드
          /*res.cookie("user", id, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
          });
          */

          //블로그 코드
          /* x_auth라는 이름으로 유저의 토큰을 쿠키에 넣는 것 ! */
          /*res
            .cookie("x_auth", user.token, {
              expires: new Date(Date.now() + 900000),
              httpOnly: true,
            })
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        } else {
          res.send(err);
          */
        }
      }
    }
  });
});

module.exports = router;
