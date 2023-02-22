// import React, {useRef} from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import IndexLogo from "./IndexLogo.jpg";

// const TopBarContainer = styled.div`
//     position: fixed;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     top:0;
//     height: 80px;
//     width:100%;
//     background-color: white;
//     padding: 0 20px;
// `;

// const LeftContents = styled.div`
//   display: flex;
// `;
// const Title = styled.img`
//     margin:40px;
//     width: 17%;
//     margin-top: 46px;
//     height: 55px;
//     color:#A27CB9;
// `;
// const Content = styled.div`
//     margin: 60px;
//     margin-right: 3px;
//     font-size: 18px;
//     font-weight: bold;
//     color: #A27CB9;
// `;

// const LoginButton = styled.button`
//     color: #8F8F8F;
//     background: #F5F5F5;
//     font-weight: bold;
//     border: none;
//     font-size: 16px;
//     border-radius: 4px;
//     margin-left: 30px ;
//     margin-right: 50px;
//     padding: 8px 16px;
//     height: 50px;
//     &:hover {
//         cursor: pointer;
//     }
//     &:focus{
//         box-shadow: 0 0 0 1px gray;
//     }
// `;

// const TopBar = () => {
//     return (
//         <TopBarContainer>
//             <LeftContents>
//                 <Title className="LogoImage" alt="IndexImage" src={IndexLogo}  />
//                 <Content>플레이리스트 제공</Content>
//                 <a href="section2"><Content>한 달의 일기 분석</Content></a>
//                 <Content>월별 일기 요약</Content>
//             </LeftContents>
//             <Link to="/members/login">
//                 <LoginButton>로그인</LoginButton>
//             </Link>
//         </TopBarContainer>
//     );
// };

// export default TopBar;