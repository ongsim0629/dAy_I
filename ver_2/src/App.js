import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";
import IndexPage from "./Index/IndexPage"
import HomePage from "./Home/HomePage";
//import EditPage from "./Edit/EditPage";

function App(){
  return (
      <div className="App">
        <Routes>
            <Route exact path="/" element={<IndexPage/>}/> 
            <Route path="/members/register" element={<RegisterPage/>}/>
            <Route path ="/members/login" element={<LoginPage/>}/>
            <Route path ="/members/home" element={<HomePage/>}/>
        </Routes>
      </div> 
  );
};

export default App;



/*
import './App.css';
import axios from 'axios'; //axios 모듈에서 axios 함수 불러옴 ($.ajax랑 거의 같음)
//axios 쓰는 목적 : 서버에 데이터를 요청할 때 비동기적으로 요청하려고

//함수형 컴포넌트
function App() {

  const selectAll = async()=>{ //화살표 함수(arrow-function)
    alert("selectAll!!")
    const result = await axios.get('/movies') //서버에 요청 보내기!! (비동기로, 요청 보내면 응답 받기 위해 돌고 있는 와중에 다른 코드들도 돌아감. 요청 받을때까지 기다리고 리턴받음)
    console.log(result) //프론트 쪽, 브라우저에서 볼 수 있다!!
    // http://localhost:4000/movies
  }
  const selectWhere = async()=>{
    alert("selectWhere!!")
    axios.get('/movie/'+3)
  }

  return (
    <div id="App">
      <h1>React-Express-Mysql 연결</h1>
      <button onClick={selectAll}>모두조회</button>
      <button onClick={selectWhere}>조건조회</button>
    </div>
  );
}

export default App;
*/