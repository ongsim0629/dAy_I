import React, { useState } from 'react';
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import {PieChart, Pie, Tooltip, Cell, Legend} from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Header = styled.header`
  top: 0;
  width: 100%;
  height: 100px;
  background-color: #E5E0FF;
`;
const Layout = styled.div`
  width: 100vw;
  margin-top: 30px;
  //height: 100vh;
  display: grid;
  flex-direction: column;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "left right";
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
const TopLeft = styled.div`
  width: 90%;
  height: 300px;
  margin: 0 auto;
  background: #F5F5F5;
  text-align: center;
  border-radius: 30px;
  margin-left: 60px;
  margin-bottom: 15px;
`;
const TopRight = styled.div`
  width: 90%;
  height: 300px;
  margin: 0 auto;
  background: #F5F5F5;
  text-align: center;
  border-radius: 30px;
  margin-right: 60px;
  margin-bottom: 15px;
`;
const BottomLeft = styled.div`
  width: 90%;
  height: 300px;
  margin: 0 auto;
  background: #F5F5F5;
  text-align: center;
  border-radius: 30px;
  margin-left: 60px;
  margin-top: 15px;
`;
const BottomRight = styled.div`
  width: 90%;
  height: 300px;
  margin: 0 auto;
  background: #F5F5F5;
  text-align: center;
  border-radius: 30px;
  margin-right: 60px;
  margin-top: 15px;
`;


function Mypage(){
    const location = useLocation();
    const myData = location.state.myData;
    let emo_count_arr = myData.emo_count_arr;
    let playlist_title = myData.playlist_title;
    let playlist_url = myData.playlist_url;
    let thumbnail_url = myData.thumbnail_url;
    let attendance_rate = Math.floor(myData.attendance_rate);

    //category
    let category_arr = myData.category_arr;
    let category_count_arr = myData.category_count_arr;
    let diary_count = myData.diary_count;

    console.log(myData)

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

  //카테고리
  const categoryData = [
    {
      name: category_arr[0],
      value: category_count_arr[0],
      img: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F2806%2FPNG%2F512%2Fhappy_emoji_emo_emoticon_icon_178898.png&imgrefurl=https%3A%2F%2Ficon-icons.com%2Fko%2F%25EC%2595%2584%25EC%259D%25B4%25EC%25BD%2598%2F%25ED%2596%2589%25EB%25B3%25B5-%25EC%259D%25B4%25EB%25AA%25A8%25ED%258B%25B0%25EC%25BD%2598-emo-%25EC%259D%25B4%25EB%25AA%25A8%25ED%258B%25B0%25EC%25BD%2598%2F178898&tbnid=_0DJCKOXzkNanM&vet=12ahUKEwiD-fqI0qP9AhX6p1YBHSWAC0gQMygAegUIARDCAQ..i&docid=n5a4JKDVg9EFtM&w=512&h=512&q=%ED%96%89%EB%B3%B5%20%EC%9D%B4%EB%AA%A8%EC%A7%80&ved=2ahUKEwiD-fqI0qP9AhX6p1YBHSWAC0gQMygAegUIARDCAQ',
      ratio: Math.ceil(category_count_arr[0]/diary_count*100), //28 부분 바뀔 예정
    },
    {
      name: category_arr[1],
      value: category_count_arr[1],
      img: 'https://via.placeholder.com/50',
      ratio: Math.ceil(category_count_arr[1]/diary_count*100),
    },
    {
      name: category_arr[2],
      value: category_count_arr[2],
      img: 'https://via.placeholder.com/50',
      ratio: Math.ceil(category_count_arr[2]/diary_count*100),
    },
    {
      name: category_arr[3],
      value: category_count_arr[3],
      img: 'https://via.placeholder.com/50',
      ratio: Math.ceil(category_count_arr[3]/diary_count*100),
    },
    {
      name: category_arr[4],
      value: category_count_arr[4],
      img: 'https://via.placeholder.com/50',
      ratio: Math.ceil(category_count_arr[4]/diary_count*100),
    },
  ];

  const CustomBar = ({ x, y, width, height, value, background, label }) => (
    <g>
      <image href={background} x={x} y={y} width={width} height={height} />
      <text x={x + width + 5} y={y + height / 2} dy="0.35em">
        {label}
      </text>
      {/* <text x={x + 5} y={y + height / 2} textAnchor="end" dy="0.35em">
        {value}
      </text> */}
    </g>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: '#fff', padding: '5px' }}>
          <div style={{ fontWeight: 'bold' }}>{data.name}</div>
          <div>Value: {data.value}</div>
          <div>Ratio: {data.ratio}</div>
        </div>
      );
    }
    return null;
  };

    return(
    <>
    <Header>
        <Link to="/">
            <h1 style={{marginTop: '30px', color:'#A27CB9', marginLeft:'30px', display: 'inline-block', textDecoration: 'none'}}> &#128393; 사이트 제목 </h1>
            <Link to="/members/edit"><EditButton>회원정보 수정</EditButton></Link>
        </Link>
    </Header>
    <Layout>
        {/* <h1 style={{fontWeight: 'normal'}}>MyPage</h1> */}
        <TopLeft>
            <h3>이번 달 감정 통계</h3>
            <div style={{display: 'flex', justifyContent: 'center', textItems: 'center'}}>
                <PieChart width={300} height={300}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data}
                        cx={100}
                        cy={100}
                        innerRadius={40} outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="top" layout="vertical" align="right"/>
                    <Tooltip />
                </PieChart>
            </div>
        </TopLeft>
        <TopRight>
            <h3>이번 달 내가 관심있던 키워드</h3>
            <BarChart
                width={500}
                height={250}
                data={categoryData}
                margin={{ top: 20, right: 30, left: 90, bottom: 30 }}
                layout="vertical"
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                    dataKey="value"
                    background={data.map((d) => d.img)}
                    barSize={18}
                    label={<CustomBar />}
                    fill="gray"
                />
            </BarChart>
        </TopRight>
        <BottomLeft>
            <h3 style={{marginBottom: '0.4em'}}>이달의 플레이리스트 (월별 빈도수 1위)</h3>
            <div>
              <a href={playlist_url} target='_blank'><img alt="thumbnail_img" src={thumbnail_url} style={{width: '60%', borderRadius: '7px'}}/></a><br />
              <a href={playlist_url} target='_blank' style={{fontSize: '20px', fontWeight: 'normal', textDecoration: 'none', color: 'black'}}>{playlist_title}</a><br /><br />
            </div>
        </BottomLeft>
        <BottomRight>
            <h3>이번 달 나의 출석율</h3>
            <h3>{attendance_rate}</h3>
        </BottomRight>
        
        
    </Layout>
    </>
    );
}

export default Mypage;