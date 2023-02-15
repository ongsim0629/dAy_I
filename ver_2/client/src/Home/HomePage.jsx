import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "./DatePicker.css"
import "react-datepicker/dist/react-datepicker.css";
//import ko from 'date-fns/locale/ko';

const Header = styled.header`
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    background-color: #E5E0FF;
`;

const Layout = styled.div`
    padding-top:25px;
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
    border-radius: 4px;
    padding: 7px 10px;

    &:hover {
        cursor: pointer;
    }
    &:focus{
        box-shadow: 0 0 0 1px gray;
    }
`;

        // 응답(항상 실행)

function HomePage() {
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState(new window.Date());
  const navigate = useNavigate();

  axios.get('/members/edit')
        .then(function () {
            const token = localStorage.getItem("token");
            var base64Url = token.split('.')[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
            var result = JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join('')));
            let login_id = result.user_id;
            console.log(login_id);
            setId(login_id);
        })
        // 응답(실패)
        .catch(function (error) {
            console.log(error);
        })

  // 로그아웃
  const onLogoutButtonHandler = () => {
    let token = localStorage.getItem('token')
    localStorage.clear()
  }

  //문자열 변환
  const dateToString = () => {
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const date = startDate.getDate();
    return `${year}-${month >= 10 ? month : "0" + month}-${
      date >= 10 ? date : "0" + date
    }`;
  };

  const onDatePickHandler = async(date)=>{
    setStartDate(date);

    //diary 있는 경우로 조건 달아줘야 함
    //diary로 이동 시 URL로 date, user_id 전달해야 함
    await axios.post('/diaries/test/id', {
      id: id,
      date: dateToString(startDate)
    })
    .then((res) => {
      console.log("서버로 date와 id가 전달되었습니다.")
    })
    .catch((error) => {
      console.log(error);
    })


    // await axios({
    //   method: 'get',
    //   url: '/diaries',
    //   params: {
    //     id: id,
    //     date: date
    //   }
    // })


    //작성한 내용이 있으면 읽기 페이지로, 없으면 쓰기 페이지로 가야 하지만 
    //일단 선택한 날짜의 읽기 페이지로 가도록 함
    navigate("/members/test/write", {state: {selectedDate: date}});
    
}
  return (
    <>
      <Header>
        <Link to="/">
          <CustomButton onClick={onLogoutButtonHandler} style={{marginLeft:'1320px'}}>로그아웃</CustomButton>
        </Link>
        <Link to="/members/test/mypage">
          <CustomButton type='button' style={{marginLeft:'20px'}}>마이페이지</CustomButton>
        </Link>
      </Header>
      <Layout> 
            {/* <h4>{id}님 환영합니다</h4>
            <Link to="/diaries/id/date">
              <h5>10일</h5>
            </Link> */}
            <h2 style={{color:'#AEAEAE', fontFamily:'AbeeZee'}}>당신의 소중한 하루를 기록해보세요.</h2><br/>
            <DatePicker
                onChange={(date)=>onDatePickHandler(date)}
                selected={startDate}
                // {/* locale={ko} */}
               //  {/* highlightDates={[]} */}
                className="datePicker"
                inline
                >
      </DatePicker>
            
      </Layout> 
    </>
    
  );
}

export default HomePage;