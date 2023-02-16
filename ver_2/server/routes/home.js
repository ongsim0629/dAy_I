var express = require("express");
var router = express.Router();

//var jwt = require("../node_modules/jsonwebtoken"); //추가

var jwt = require("jsonwebtoken");

const db = require("../../server/config/db.js");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

process.setMaxListeners(0);

/* GET users listing. */
router.get('/', function(req, res, next) {
        console.log("데이터베이스 conn");
        res.send({'message':'node get success'});
});


router.post('/', function(req, res, next) {
    console.log("/members/home 호출됨");
    const id = req.body.id;

    var query =
    "select diary_write_date from diary where diary_writer_id ='" + id + "';";
  console.log(">>>서버로 전달된 id : ", id);

  db.query(query, function(err, result){
    var dataList = [];
    for (var data of result){
      dataList.push(new Date(data.diary_write_date));
    };
    console.log(dataList);
    res.send(dataList);
});
});


module.exports = router;