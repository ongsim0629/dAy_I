import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import './App.css';
import axios from "axios";
import {useEffect} from "react";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";
import IndexPage from "./Index/IndexPage"


function App() {
  const callApi = async () => {
    axios.get('/juso')
    .then((res) => {
      console.log(res.data.test)
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<IndexPage/>}/> 
            <Route path="/members/register" element={<RegisterPage/>}/>  
            <Route path ="/members/login" element={<LoginPage/>}/>
        </Routes>
      </Router>
  </div> 
  );
}

export default App;