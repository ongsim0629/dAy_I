var express = require("express");

var usersRouter = require("./routes/users");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var editRouter = require("./routes/edit");
var writeRouter = require("./routes/write");
var diaryRouter = require("./routes/diary");
var diaryDeleteRouter = require("./routes/diary_delete");
var mypageRouter = require("./routes/myPage");

var app = express();

app.use("/users", usersRouter);
app.use("/members/new", registerRouter);
app.use("/members/login", loginRouter);
app.use("/members/edit", editRouter);
app.use("/members/test/write", writeRouter); //test 끼워넣기는 front팀과 일치시키기 위함
app.use("/diaries/test/id", diaryRouter); //GET이기에 콜론 작성 (token은 보류)
///members/diary/:id/:date
app.use("/members/delete", diaryDeleteRouter);
app.use("/members/mypage", mypageRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
