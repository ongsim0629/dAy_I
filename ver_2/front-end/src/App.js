import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import './App.css';
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";
import IndexPage from "./Index/IndexPage"
import EditPage from "./Edit/EditPage";
import WritePage from "./Write/WritePage";
import HomePage from "./Home/HomePage";

// flask-node-react 연결 테스트 페이지
import WriteTestPage from "./FlaskTest/WriteTestPage";

function App(){
  return (
      <div className="App">
        <Routes>
            <Route exact path="/" element={<IndexPage/>}/> 
            <Route path="/members/register" element={<RegisterPage/>}/>  
            <Route path ="/members/login" element={<LoginPage/>}/>
            <Route path="/members/test/edit" element={<EditPage/>}/>
            <Route path="/members/test/write" element={<WritePage/>}/>
            <Route path="/members/home" element={<HomePage/>}/>
            
            {/* flask-node-react 연결 테스트 페이지 */}
            <Route path="/writetest" element={<WriteTestPage/>}/>
            {/* 일단 /{id} 대신 /test 사용 */}
        </Routes>

      </div> 
  );
};

export default App;