import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
<<<<<<< HEAD
    return(
        <div>
            <h1>HomePage.jsx</h1>
            <Link to="/">
                <h1>페이지 이름</h1>
            </Link>
            <Link to="/writetest">
                <h1>일기 쓰러 가기</h1>
            </Link>
            <Link to="/diaries/id/date">
                <h1>10일</h1>
            </Link>
            /*
            <Link to="/">
                <button onclick="logout()">로그아웃</button>
            </Link>
            */
        </div>
    )
=======

  // 로그아웃
  const onLogoutHandler = () => {
    let token = localStorage.getItem('token')
    localStorage.clear()
  }

  return (
    <div>
      <h1>HomePage.jsx</h1>
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
>>>>>>> 8ea39a2e6ef04e2cacf15758e70a907529c51e42
}
/*
function logout() {
    localStorage.removeItem("token");
}
*/

export default HomePage;
