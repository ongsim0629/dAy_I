import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import './App.css';
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";
import IndexPage from "./Index/IndexPage"
import EditPage from "./Edit/EditPage";
import WritePage from "./Write/WritePage";

function App(){
  return (
      <div className="App">
        <Routes>
            <Route exact path="/" element={<IndexPage/>}/> 
            <Route path="/members/register" element={<RegisterPage/>}/>  
            <Route path ="/members/login" element={<LoginPage/>}/>
            <Route path="/members/test/edit" element={<EditPage/>}/>
            <Route path="/members/test/write" element={<WritePage/>}/>
            {/* 일단 /{id} 대신 /test 사용 */}
        </Routes>

      </div> 
  );
};

export default App;