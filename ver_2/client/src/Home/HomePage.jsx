import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate , useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "./DatePicker.css";
import "react-datepicker/dist/react-datepicker.css";
//import ko from 'date-fns/locale/ko';

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
  flex-direction: column;
  align-items: center;
`;

const CustomButton = styled.button`
    color: #8F8F8F;
    background: #F5F5F5;
    font-weight: bold;
    border: none;
    margin-top: 32px;
    margin-right: 20px;
    border-radius: 4px;
    padding: 7px 10px;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    box-shadow: 0 0 0 1px gray;
  }
`;

// 응답(항상 실행)

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const calRef = useRef();
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState(new window.Date());
//   const dateList = location.state.dateList;

  const dataList = [];

//  for (let i = 0; i< dateList.length; i++){
//                       dataList.push(new Date(dateList[i].diary_write_date));
//                     };

  console.log(dataList);

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

    //일기 유무 날짜 데이터 요청
    const result = axios.post("/members/home", {
      id : id})
      .then(response => {
        console.log(response.data)
      // response  
    }).catch(error => {
     // 오류발생시 실행
    }).then(() => {
     // 항상 실행
    });

  // 로그아웃
  const onLogoutButtonHandler = () => {
    let token = localStorage.getItem("token");
    localStorage.clear();
    navigate('/');
  };

  //서버 전달용: 영문식 달력에서 온 date를 한국 스타일의 string 형식(연-월-일)으로 변환
  const dateToString = () => {
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const date = startDate.getDate();
    return `${year}-${month >= 10 ? month : "0" + month}-${
      date >= 10 ? date : "0" + date
    }`;
  };

  //검색용: highlighted인 날짜를 찾기 위해 highlighted에 저장되는 날짜 형식인 (월.일.연도)로 변환
  const dateToStringForSearch = (d) => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    return `${month >= 10 ? month : "0" + month}.${date >= 10 ? date : "0"+date}.${year}`;
  };

  const onDatePickHandler = async (date) => {
    setStartDate(date);
    const highlightDates = calRef.current.state.highlightDates;

    // <작성한 내용이 있으면 읽기 페이지로, 없으면 쓰기 페이지로> 
    // 이 페이지가 렌더링될 때 서버에서 일기가 있는 페이지 정보를 받아오면
    // 그 정보를 DatePicker의 highlighted에 넣어 일기가 있는 페이지의 날짜는 회색 동그라미가 그려짐
    // 이를 이용해 날짜를 highlighted map에서 검색했을 때 날짜가 존재하면 일기가 있는 날짜로 간주함

    if(highlightDates.has(dateToStringForSearch(date))===true){ //선택한 날짜가 highlighted 상태 
      //diary로 이동 시 URL로 date, user_id 전달
        await axios
        .post("/diaries/test/id", {
          id: id,
          date: dateToString(startDate),
        })
        .then((res) => {
          console.log("서버로 date와 id가 전달되었습니다.");
        })
        .catch((error) => {
          console.log(error);
        });
        navigate("/diaries/id/date");
    }else{
      navigate("/members/test/write", {state: {selectedDate: date}});
    }

    // await axios({
    //   method: 'get',
    //   url: '/diaries',
    //   params: {
    //     id: id,
    //     date: date
    //   }
    // })
  };

  const onMypageButtonHandler = () =>{
    navigate('/members/test/mypage');
  }

  return (
    <>
      <Header>
          <CustomButton onClick={onLogoutButtonHandler} style={{marginLeft:'1270px'}}>로그아웃</CustomButton>
          <CustomButton onClick={onMypageButtonHandler}>마이페이지</CustomButton>
      </Header>
      <Layout> 
            {/* <h4>{id}님 환영합니다</h4>*/}
            <h2 style={{color:'#AEAEAE', fontFamily:'AbeeZee'}}>당신의 소중한 하루를 기록해보세요.</h2><br/>
            <DatePicker 
                onChange={(date)=>onDatePickHandler(date)}
                selected={startDate}
                // {/* locale={ko} */}
                highlightDates={dataList}
                // highlightDates={[new Date('2023-02-12'), new Date('2023-02-11') ]}
                // highlightDates는 Map이고 []안만 찍어보면 배열 
                ref={calRef}
                inline
                >         
            </DatePicker> 
      </Layout> 
    </>
    
  );
}

export default HomePage;