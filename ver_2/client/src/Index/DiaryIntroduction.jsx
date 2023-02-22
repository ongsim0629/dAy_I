import React from "react";
import styled from "styled-components";

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
  font-size: 45px;
`;

const Description = styled.p`
  max-width: 600px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
  font-family: AbeeZee;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const DiaryIntroduction = () => {
    return (
        // <Wrapper>
        <>
          <Title>Product Name</Title>
          <Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
          </Description>
          <Image src="/path/to/product/image.jpg" alt="Product Image" />
        {/*  </Wrapper> */}
        </>
    );
};

export default DiaryIntroduction;