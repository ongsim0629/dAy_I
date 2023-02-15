var express = require("express");

var usersRouter = require("./routes/users");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var editRouter = require("./routes/edit");
var writeRouter = require("./routes/write");
var diaryRouter = require("./routes/diary");

var app = express();




app.use("/users", usersRouter);
app.use("/members/new", registerRouter);
app.use("/members/login", loginRouter);
app.use("/members/edit", editRouter);
app.use("/members/test/write", writeRouter); //test 끼워넣기는 front팀과 일치시키기 위함
app.use("/members/diary", diaryRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
