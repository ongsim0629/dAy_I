import React from 'react';
import styled from "styled-components";
//import IndexImage from "./IndexImage.png"; //사진 배경 하얀 버전 (화질 좋음, 어색함)
import Test from "./test.png"; //사진 배경에 보라색 포함된 버전 (화질낮음, 자연스러움)
import { Link } from "react-router-dom";
import SideNav from "../SideNav";

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
    width: 100vw;
    height: 100vh;
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


const Layout2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
  color: #a7a9be;
  font-size: 1.5rem;
  font-family: sans-serif;
`;

function IndexPage(){
    return(
        <div>
            <div style={{position:'fixed', width:'1250px'}}>
                <Header >
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <h1 style={{width:'90%', color:'#A27CB9', marginLeft:'25px'}}> &#128393; 사이트 제목 </h1>
                        <Link to="/members/login">
                            <LoginButton style={{marginTop:'20px', padding:'5px 20px', fontSize:'15px', fontFamily:'AbeeZee'}}>로그인</LoginButton>
                        </Link>
                    </div>  
                </Header>
                
                {/* <SideNav /> */}
                
                <Layout style={{display:'flex'}}>
                    <div style={{width:'50%'}}>
                            <div style={{margin: '200px', display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
                                <h1 style={{fontSize:'40px'}}>사이트 제목</h1>
                                <p style={{marginTop:'0px',color:"#6D6D6D", fontFamily:'AbeeZee'}}>노래부터 관련 사이트까지, 일기와 함께해요. <br></br>
                                    상호작용하는 일기를 써보아요. </p>
                            </div>
                            
                            
                    </div>
                    <div >
                        {/* <img className="phoneImage" alt="IndexImage" src={IndexImage}  /> */}
                        <img style={{margin:'30px'}}alt="IndexImage" src={Test}  />
                    </div>
                </Layout>
            </div>
        </div>
    );
}

export default IndexPage;