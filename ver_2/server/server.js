var express = require("express");

var usersRouter = require("./routes/users");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var editRouter = require("./routes/edit");
var writeRouter = require("./routes/write");

var app = express();

var request = require("request"); // 일기 내용 담는 변수

var result = ""

// FLASK-NODEJS 연동
app.post("/writetest", (req, res) => {
    // console.log("text: ", req.body.text);

    // REACT로부터 일기 내용 받아오기
    let body = req.body;
    const diarycontent = "면접을 붙어서 첫 출근을 기다리는 시간은 달콤했다 3년 내내 일만 했어서인지 평일 낮에 즐기는 자유시간이 너무 어색해서, 그냥 세상을 다 가진 것 같았다. 인턴을 7개월 내내 열망하고 있었기 때문이다 인턴 언니랑 술을 먹으며 마지막이라 미안하다고 했지만, 첫 출근이 기대됐다. 아빠가 밥은 먹었냐고 점심에 문자 보내시면 속으로는 '아니야. 아빠 나 일이 너무많고, 내가 업무에 따라가기가 벅차서 점심시간에 40분넘겨서 일했어. 여기 인턴분도 굉장히 우울해보여.'를 외쳤는데 문자로는 맛있는거 먹었다구 했다. 또한 6시에 기상하며 8시에집에오는 살인적인스케쥴과 일을 따라가기 위해 밀려오는 매일의 스트레스.. 내가 이 6개월을 끝나고 과연 어떤 성취감을 느낄것이며 추후에 내 스펙에 이 활동이 도움이될까? 의문이 들었다. 난 마케터를 꿈꾸기 때문에 대외활동과 동아리도하며 sns도 운영해야하는 멀티플레이어 유망자인데, 그것들을 챙길 시간조차 없는 것도 너무 화났다. 이것도 정말 내 스펙에 관해서 중요한 것들인데? 원하지 않는 일때문에 내가 좋아하고, 원하는 일들을 하지 못한다는 논리가 성립이 되는걸까? 근데도 그 뿐만이였다 내가 잠시괜찮은건 집에도착헤서 8시 ~10시반. 그 이후부터는 내일출근할생각에 고통스럽다. 왜 3개월 끝나고 다른곳에 지원할 생각은 안했는가..? 나는 이 글을 월요일이시작될 답답한 마음에 10월 30일 일요일 새벽 2시에적다가 다시 월요일인 오늘 출근길에 이어서썼다 으악 충무로다..... 가기싫다 ​ 한달이 지난 11월 28일에 다시글을써보겠다 사람이라는건 참으로 신기하다 적응이 되니까 바쁘지도 스트레스받지도 않지만 일이 끊임없이있는건 괴롭다 이제 눈물도 안나지만 진짜 가끔 개혼날때 너무 상처받는다 그치만 가볍게 넘기려고 한다 그리고 나도 업무를 못하는게사실이니까 ​ 다른것도하고싶다.....이걸 어떻게 5개월 더 하지?";

  // FLASK로 일기 내용 보내기
  const ModelResult = (callback) => {
    const options = {
      method: "POST",
      uri: "http://127.0.0.1:4000/sendmodeltext",
      qs: {
        text: diarycontent,
      },
    };
    request(options, function (err, res, body) {
      callback(undefined, {
        result: body,
      });
    });
  };

  //FLASK로부터 변경 내용 받아서 REACT로 넘기기
  ModelResult((err, { result } = {}) => {
    if (err) {
      console.log("error!!!!");
      res.send({
        message: "fail",
        status: "fail",
      });
    }

    let json = JSON.parse(result);
    console.log(json);
    res.send({
      message: "from flask",
      status: "success",
      data: {
        json,
      },
    });
  });
});

app.use("/users", usersRouter);
app.use("/members/new", registerRouter);
app.use("/members/login", loginRouter);
app.use("/members/:{id}/edit", editRouter);
app.use("/members/test/write", writeRouter); //test 끼워넣기는 front팀과 일치시키기 위함

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
