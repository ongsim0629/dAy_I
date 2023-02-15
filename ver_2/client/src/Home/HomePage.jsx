import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


        // 응답(항상 실행)

function HomePage() {
  const [id, setId] = useState("");
  
  let login_id = axios.get('/members/edit')
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
  const onLogoutHandler = () => {
    let token = localStorage.getItem('token')
    localStorage.clear()
  }

  return (
    <div>
      <h1>HomePage.jsx</h1>
      <h1>{id}님 환영합니다</h1>
      {/* <h1>---님 환영합니다.</h1> */}
      <Link to="/">
        <h1>페이지 이름</h1>
      </Link>
      <Link to="/members/test/write">
        <h1>일기 쓰러 가기</h1>
      </Link>
      <Link to="/diaries/id/date">
        <h1>10일</h1>
      </Link>
      <Link to="/">
        <button type="button" onClick={onLogoutHandler}>로그아웃</button>
      </Link>
    </div>
  );
}

export default HomePage;