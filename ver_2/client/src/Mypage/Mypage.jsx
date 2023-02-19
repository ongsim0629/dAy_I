import React, { useState } from 'react';
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import {PieChart, Pie, Tooltip, Cell} from "recharts";

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
    height: 300px;
    float: left;
    background: #F5F5F5;
    margin-bottom: 30px;
    text-align: center;
`;
const Right = styled.div`
    width: 50%;
    height: 300px;
    float: right;
    background: #F5F5F5;
    text-align: center;
    overflow-y:scroll;
`;

function Mypage(){
    const location = useLocation();
    const myData = location.state.myData;
    let emo_count_arr = myData.emo_count_arr;
    let playlist = myData.playlist;

    //console.log(myData.playlist)

    const data = [
    {name: "중립", value: emo_count_arr[0]},
    {name: "기쁨", value: emo_count_arr[1]},
    {name: "당황", value: emo_count_arr[2]},
    {name: "분노", value: emo_count_arr[3]},
    {name: "혐오", value: emo_count_arr[4]},
    {name: "슬픔", value: emo_count_arr[5]},
    {name: "불안", value: emo_count_arr[6]},
  ];
  const COLORS = ['#AB8FDA', '#F89D81', '#F9C62B', '#ED5565', '#9B9FA7', '#87C1F5', '#515966'];

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
            <h3>이번 달 감정 통계</h3>
            <div style={{display: 'flex', justifyContent: 'center', textItems: 'center'}}>
                <PieChart width={300} height={300}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data}
                        cx={150}
                        cy={100}
                        innerRadius={40} outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </Left>
        <Right>
            <h3>이번 달 추천 플레이리스트 기록</h3>
            <div>
                {playlist.map((value, index) => (
                    // 링크 연결X 버전
                    <p key={index}>
                        {value}
                    </p>

                    // 링크 연결 버전
                    // <a href="https://www.youtube.com/watch?v=dP95z1QgnXk" key={index}>
                    //     {value}<br /><br />
                    // </a>
                ))}
            </div>
        </Right>
        
    </Layout>
    </>
    );
}

export default Mypage;