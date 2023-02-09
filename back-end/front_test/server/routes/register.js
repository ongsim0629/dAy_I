var express = require('express');
var router = express.Router();

/* Post 회원가입. */
router.post('/', (req, res) => {
    console.log("/members/new post 성공 " +req.body.id );
});
  

module.exports = router;