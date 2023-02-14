import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from 'axios';

function Mypage(){
    return(
    <>
        <h1>This is mypage</h1>  
        <Link to="/members/test/edit"><button>회원정보 수정</button></Link>
    </>
    );
}

export default Mypage;