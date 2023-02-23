import React from "react";
import styled from "styled-components";
import HomePageImage from "./HomePageImage.png";

// const Wrapper = styled.section`
//     display: flex;
//     flex-direction: column;
//     margin-top: 80px;
//     align-items: center;
//     height: 100vh;
//     :nth-child(2n+1){
//         background-color: #E5E0FF;
//     }
// `;

const Title = styled.h1`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 42px;
  font-family: AbeeZee;
`;

const Description = styled.p`
  max-width: 100%;
  margin-bottom: 10px;
  text-align: center;
  font-size: 20px;
  font-family: AbeeZee;
`;

const DiaryIntroduction = ({title, description}) => {
    return (
        // <Wrapper>
        <>
          <Title >{title}</Title>
          <Description>
              {description}
          </Description>
        {/*  </Wrapper> */}
        </>
    );
};

export default DiaryIntroduction;