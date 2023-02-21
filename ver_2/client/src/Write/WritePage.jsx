import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

const Header = styled.header`
  top: 0;
  left: 0;
  width: 100%;
  flex-direction: row;
  background-color: #e5e0ff;
`;


const Layout = styled.div`
  margin-top: 4%;
  width: 90vw;
  height: 100vh;
  flexdirection: "column";
  alignitems: "center";
  position: fixed;
  padding-left: 80px;
  margin-right: 100px;
`;

const BackButton = styled.button`
  color: #9F9F9F;
  font-size: 17px;
  background: #f5f5f5;
  font: AbeeZee;
  border: none;
  border-radius: 4px;
  margin: 20px;
  margin-left: 45px;
  padding: 10px 27px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    box-shadow: 0 0 0 1px gray;
  }
`;

const SaveButton = styled.button`
  color: white;
  font-size: 17px;
  font: AbeeZee;
  background: #93B5C6;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  float: right;
  margin: 1px 20px 20px;
  
  padding: 10px 27px;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    box-shadow: 0 0 0 1px gray;
  }
`;
//버튼과 구분선이 헤더에 고정되게 해야 함

const DateInput = styled(DatePicker)`
  margin-bottom: 10px;
  border: none;
  font-size: 16px;
  color: #aeaeae;

  &:focus {
    outline: 0;
  }
`;

const Title = styled.input`
  font-size: 35px;
  font-weight: bold;
  border: none;
  margin-bottom: 15px;

  &:focus {
    outline: 0;
  }
`;

const Content = styled.textarea`
  background: #f5f5f5;
  padding: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 45vh;
  width: 100%;
  max-width: 100%;
  font-size: 16px;
  font-family: AbeeZee, sans-serif;
  border: none;
  border-radius: 4px;
  resize: none;

  &:focus {
    outline: 0;
  }
`;

//임시저장 버튼 보류

function WritePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [startDate, setStartDate] = useState(location.state.selectedDate);
  const [title, setTitle] = useState("제목");
  const [content, setContent] = useState("");

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const onContentHandler = (event) => {
    setContent(event.target.value);
  };

  const dateToString = () => {
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const date = startDate.getDate();
    return `${year}-${month >= 10 ? month : "0" + month}-${
      date >= 10 ? date : "0" + date
    }`;
  };

  const onBackHandler = async (event) => {
    event.preventDefault();

    console.log("이전 버튼 클릭!");

    const result = await axios
      .post("/members/tohome", {
        //서버로 id, password 전달
        token: localStorage.getItem("token"),
        date: dateToString(startDate)
      })
      .then((res) => {
        console.log(dateToString(startDate));
        console.log(res);
        //localStorage.setItem("token", res.data.jwt); //(주석 제거 필요!!) 데이터 받아왔을 때 특정 이름으로 저장하는 거. 다른 곳에서 토큰 불러올 수 있게 처리하는 작업
        localStorage.setItem("token", res.data.token);
        navigate("/members/home", { state: { dataList: res.data.dataList, summaryList: res.data.summaryList } });
        //sessionStorage.setItem('user_id', id) //참고로 적어둠
        console.log("Submit Button Click"); //확인용
      });
  };

  const onSaveButtonHandler = () => {
    axios
      .post("/members/test/write", {
        date: dateToString(startDate),
        title: title,
        content: content,
        token: token,
      })
      .then(function (res) {
        console.log(res);
        alert("일기가 저장되었습니다:D");
        navigate("/members/home", { state: { dateList: res.data.dataList, summaryList: res.data.summaryList } });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div style={{weight: '100vw'}}>
      <Header>
        <BackButton onClick={onBackHandler}>이전</BackButton>{" "}
        
      </Header>
      <Layout>
          <DateInput
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd &#128198;"
              locale={ko}
          />
          <Title defaultValue="제목" onChange={onTitleHandler}></Title>
          <hr />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Content onChange={onContentHandler}>{content}</Content>
          </div>
          <SaveButton onClick={onSaveButtonHandler}>저장</SaveButton>
      </Layout>
    </div>
  );
}

export default WritePage;