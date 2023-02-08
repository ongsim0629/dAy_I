import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 1000;
    background-color: white;
`;

const Layout = styled.div`
    padding-top: 100px;
    width:100%;
    height: 100px;
    background-color: #E5E0FF;
`;

const LoginButton = styled.button`
    color: #8F8F8F;
    background: #F5F5F5;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    margin-left: 30px ;
    padding-left: 10px;
    height: 50px;

    &:hover {
        cursor: pointer;
    }
    &:focus{
        box-shadow: 0 0 0 1px gray;
    }
`;

function IndexPage(){

    return(
        <div>
            <Header>
                <div style={{display:'flex'}}>
                    <h1 style={{width:'90%'}}> &#128393; 사이트 제목 </h1>
                    <Link to="/members/login">
                        <LoginButton>로그인</LoginButton>
                    </Link>
                </div>  
            </Header>
            <Layout></Layout>
        </div>
    );
}

export default IndexPage;