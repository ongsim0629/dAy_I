import {React, useRef} from 'react';
import styled from "styled-components";
import Test from "./test.png"; //사진 배경에 보라색 포함된 버전 (화질낮음, 자연스러움)
import { Link } from "react-router-dom";
// import TopBar from './Topbar';
import DiaryIntroduction from './DiaryIntroduction';
import IndexLogo from "./IndexLogo.jpg";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './Index.css';

const TopBarContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top:0;
    height: 80px;
    width:100%;
    background-color: white;
    padding: 0 20px;
`;

const LeftContents = styled.div`
  display: flex;
`;
const Title = styled.img`
    margin:40px;
    width: 17%;
    margin-top: 46px;
    height: 55px;
    color:#A27CB9;
`;
const Content = styled.div`
    margin: 60px;
    margin-right: 3px;
    font-size: 18px;
    font-weight: bold;
    color: #A27CB9;
    &:hover{
        color:orange;
    }
`;

const Asdf = styled.p`
    margin: 60px;
    margin-right: 3px;
    font-size: 18px;
    font-weight: bold;
    color: #A27CB9;
    &:hover{
        color:orange;
    }
`;

const LoginButton = styled.button`
    color: #8F8F8F;
    background: #F5F5F5;
    font-weight: bold;
    border: none;
    font-size: 16px;
    border-radius: 4px;
    margin-left: 30px ;
    margin-right: 50px;
    padding: 8px 16px;
    height: 50px;
    &:hover {
        cursor: pointer;
    }
    &:focus{
        box-shadow: 0 0 0 1px gray;
    }
`;
// const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     margin-top: 80px;
//     align-items: center;
//     height: 100vh;
//     :nth-child(2n){
//         background-color: #E5E0FF;
//     }
// `;

const ProductTitle = styled.h1`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 45px;
`;

const ProductDescription = styled.p`
  max-width: 600px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
  font-family: AbeeZee;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const Empty = styled.div`
    height:80px;
`;
function IndexPage(){
    const idxRef = useRef(null);

    return(
        <>
            <TopBarContainer>
                <LeftContents >
                    <Title className="LogoImage" alt="IndexImage" src={IndexLogo} />
                    <AnchorLink href="#section1"><Content >플레이리스트 제공</Content></AnchorLink>
                    <AnchorLink href="#section2"><Content >한 달의 일기 분석</Content></AnchorLink>
                    <AnchorLink href="#section3"><Content >월별 일기 요약</Content></AnchorLink>
                    
                </LeftContents>
                <Link to="/members/login">
                    <LoginButton>로그인</LoginButton>
                </Link>
            </TopBarContainer>
                {/* <SideNav /> */}
                {/* <Layout style={{display:'flex'}}>
                    <div style={{width:'50%'}}>
                            <div style={{margin: '200px', display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
                                <p style={{marginTop:'0px',color:"#6D6D6D", fontFamily:'AbeeZee'}}>노래부터 관련 사이트까지, 일기와 함께해요. <br></br>
                                    상호작용하는 일기를 써보아요. </p>
                            </div>
                    </div>
                </Layout> */}
                <section id="section1"><Empty ref={idxRef}/><DiaryIntroduction/></section> 
                <section id= "section2"><Empty ref={idxRef}/><DiaryIntroduction/></section>
                <section id= "section3"><Empty ref={idxRef}/><DiaryIntroduction/></section> 
            </>
    );
}

export default IndexPage;