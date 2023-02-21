import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate , useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "./DatePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import TodayLines from "./TodayLines";

const Header = styled.header`
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  background-color: #e5e0ff;
`;

const Layout = styled.div`
  padding-top: 25px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const CustomButton = styled.button`
    color: #8F8F8F;
    background: #F5F5F5;
    font-weight: bold;
    font-size: 17px;
    border: none;
    margin-top: 32px;
    margin-bottom: 30px;
    margin-right: 20px;
    border-radius: 4px;
    padding: 10px 13px;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    box-shadow: 0 0 0 1px gray;
  }
`;


function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const calRef = useRef();
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState(new window.Date());
  const dateList = location.state.dataList;
  const summaryList = location.state.summaryList;
  let tempDate;

  const dataList = [];

  for (let i = 0; i< dateList.length; i++){
    dataList.push(new Date(dateList[i]));
  };

  console.log("1....",dateList, "length: ", dateList.length)
  console.log("2....",dataList, "length: ", dataList.length)

  useEffect(()=>{
    function click(event){
      window.alert("클릭");
    }

    const btnPrev = document.querySelector(".react-datepicker__navigation--previous");
    btnPrev.addEventListener("click", click);
    const btnNext = document.querySelector(".react-datepicker__navigation--next");
    btnNext.addEventListener("click", click); 
  },[])

  axios
    .get("/members/edit")
    .then(function () {
      const token = localStorage.getItem("token");
      var base64Url = token.split(".")[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var result = JSON.parse(
        decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        )
      );
      let login_id = result.user_id;
      console.log(login_id);
      setId(login_id);
    })
    // 응답(실패)
    .catch(function (error) {
      console.log(error);
    });

  // 로그아웃
  const onLogoutButtonHandler = () => {
    let token = localStorage.getItem("token");
    localStorage.clear();
    navigate('/');
  };

  //서버 전달용: 영문식 달력에서 온 date를 한국 스타일의 string 형식(연-월-일)으로 변환
  const dateToString = (tempData) => {
    const year = tempData.getFullYear();
    const month = tempData.getMonth() + 1;
    const date = tempData.getDate();

    return `${year}-${month >= 10 ? month : "0" + month}-${
      date >= 10 ? date : "0" + date
    }`;
  };

  //검색용: highlighted인 날짜를 찾기 위해 highlighted에 저장되는 날짜 형식인 (월.일.연도)로 변환
  const dateToStringForSearch = (d) => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    return  `${month >= 10 ? month : "0" + month}.${
      date >= 10 ? date : "0" + date
    }.${year}`;
  };

  const onDatePickHandler = async (date) => {
    tempDate = date;

    console.log(">>>>tempDate : ", tempDate)

    //setStartDate(date); //*** 얘로 console 찍으면 당일 날짜 나옴 ***
    //console.log(">>>>startDate : ", startDate)

    const highlightDates = calRef.current.state.highlightDates;

    // <작성한 내용이 있으면 읽기 페이지로, 없으면 쓰기 페이지로> 
    // 이 페이지가 렌더링될 때 서버에서 일기가 있는 페이지 정보를 받아오면
    // 그 정보를 DatePicker의 highlighted에 넣어 일기가 있는 페이지의 날짜는 회색 동그라미가 그려짐
    // 이를 이용해 날짜를 highlighted map에서 검색했을 때 날짜가 존재하면 일기가 있는 날짜로 간주함

    if(highlightDates.has(dateToStringForSearch(tempDate))===true){ //선택한 날짜가 highlighted 상태 
      //diary로 이동 시 URL로 date, user_id 전달
        await axios
        .post("/diaries", {
          token: localStorage.getItem("token"),
          date: dateToString(tempDate) //클릭한 날짜로 바꿔야됨
        })
        .then((res) => {
          console.log("서버로 date와 id가 전달되었습니다.");
          navigate("/diaries", {state: {dailyData: res.data}}); //diary.js로부터 받은 일기 데이터를 DiaryPage.jsx로 넘김
        })
        .catch((error) => {
          console.log(error);
          alert('일기 정보를 가져오는데 실패했습니다.')
        });
    }
    else{ 
      navigate("/members/test/write", {state: {selectedDate: date}});
    }
      };

  const onMypageButtonHandler = (event) =>{

       axios.post("/members/mypage", {
          token: localStorage.getItem("token"),
          date: dateToString(new window.Date())
      })
      .then((res) => {
        console.log("하이>>>>", res.data)
        navigate("/members/mypage", {state: {myData: res.data}});
      })
      .catch((error) => {
        console.log(error);
        alert('마이페이지를 여는 데 문제가 생겼습니다.')
      });
  }

  return (
    <>
      <Header>
          <CustomButton onClick={onLogoutButtonHandler} style={{marginLeft:'82%'}}>로그아웃</CustomButton>
          <CustomButton onClick={onMypageButtonHandler}>마이페이지</CustomButton>
      </Header>
      <Layout> 
            {/* <h4>{id}님 환영합니다</h4>*/}
            {/* <h2 style={{color:'#AEAEAE', fontFamily:'AbeeZee'}}>당신의 소중한 하루를 기록해보세요.</h2><br/> */}
            <DatePicker 
                onChange={(date)=>onDatePickHandler(date)}
                selected={startDate}
                locale={ko} 
                highlightDates={dataList}
                //highlightDates={[new Date('2023-02-12'), new Date('2023-02-11') ]}
                // highlightDates는 Map이고 []안만 찍어보면 배열 
                ref={calRef}
                inline
                >         
            </DatePicker> 
            <TodayLines ref={calRef}>
            </TodayLines>
      </Layout> 
    </>
    
  );
}

export default HomePage;