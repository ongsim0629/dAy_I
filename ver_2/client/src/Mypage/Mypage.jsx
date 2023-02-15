import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from 'axios';

const Header = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    background-color: #E5E0FF;
`;
const Layout = styled.div`
    margin-top: 120px;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EditButton = styled.button`
    color: #8F8F8F;
    background: #F5F5F5;
    font-weight: bold;
    font-size: 15px;
    border: none;
    border-radius: 4px;
    margin-right: 60px;
    margin-top: 30px;
    float: right;
    height: 40px;
    padding: 10px 20px 10px 20px;
    &:hover {
        cursor: pointer;
    }
    &:focus{
        box-shadow: 0 0 0 1px gray;
    }
`;

const Left = styled.div`
    width: 50%;
    height: 100vh;
    float: left;
    background: #F5F5F5;
    margin-bottom: 30px;
`;
const Right = styled.div`
    width: 50%;
    height: 100vh;
    float: right;
    background: #F5F5F5;
`;

function Mypage(){
    return(
    <>
    <Header>
        <Link to="/">
            <h1 style={{marginTop: '30px', color:'#A27CB9', marginLeft:'30px', display: 'inline-block', textDecoration: 'none'}}> &#128393; 사이트 제목 </h1>
            <Link to="/members/edit"><EditButton>회원정보 수정</EditButton></Link>
        </Link>
    </Header>
    <Layout>
        <h1 style={{fontWeight: 'normal'}}>MyPage</h1>
        <Left>
            hi
        </Left>
        <Right>
            hello
        </Right>
        
    </Layout>
    </>
    );
}

export default Mypage;