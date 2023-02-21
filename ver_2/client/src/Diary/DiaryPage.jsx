import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Left = styled.div`
    width: 70%;
    height: 100vh;
    float: left;
    background: white;
`;
const Right = styled.div`
    width: 30%;
    height: 100vh;
    float: right;
    background: #F5F5F5;
`;
const BackButton = styled.button`
    color: white;
    font-weight: bold;
    margin-left: 15px;
    padding: 5px 13px;
    background: #F5F5F5;
    font-size:1rem;
    font-weight: bold;
    color: #AEAEAE;
    border:none;
    border-radius: 7px;
    &:hover {
        cursor: pointer;
    }
    &:focus{
        box-shadow: 0 0 0 1px gray;
    }
`;

const DiaryBack = styled.div`
  background: #f5f5f5;
  margin-top: 20px;
  margin-left: 50px;
  border: none;
  border-radius: 7px;
  width: 88%;
  height: 70%;
  border-radius: 20px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    padding: 20px;
    border-radius: 20px;
  }
`;

const Bar = styled.div`
    background: #A2A1FF;
    width: 70%;
    height: 28px;
    font-weight: bold;
    padding-top: 4px;
    margin-top: 30px;
    color: white;
    border-radius: 7px;
    font-size: 20px;
`;


function DiaryPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const dailyData = location.state.dailyData;
    const submitDate = dailyData.diary_write_date;

    const onBackHandler = async (event) => {
        event.preventDefault();
    
        console.log("이전 버튼 클릭!");
    
        const result = await axios
          .post("/members/tohome", {
            //서버로 id, password 전달
            token: sessionStorage.getItem("token"),
            date : submitDate
          })
          .then((res) => {
            console.log(res);
            //localStorage.setItem("token", res.data.jwt); //(주석 제거 필요!!) 데이터 받아왔을 때 특정 이름으로 저장하는 거. 다른 곳에서 토큰 불러올 수 있게 처리하는 작업
            console.log("DiaryPage에서 이전 버튼 누름- dataList : ",res.data.dataList, ", summaryList : ", res.data.summaryList);
            navigate("/members/home", { state: { dataList: res.data.dataList, summaryList: res.data.summaryList }  });
            //sessionStorage.setItem('user_id', id) //참고로 적어둠
            console.log("Submit Button Click"); //확인용
          });
      };

    const onClickDelete = async(event) => {
        event.preventDefault();

        //if (localStorage.getItem('token') == postData.post_user_id) { //수정 필요
        await axios.post("/members/delete", {
            token: sessionStorage.getItem("token"),
            date: dailyData.diary_write_date
        })
        .then((res) => {
            alert('일기가 삭제되었습니다.')
            navigate("/members/home");
        })
        .catch((error) => {
            console.log(error);
            alert('일기 정보를 가져오는데 실패했습니다.')
        });
        // }
        // else {
        //     alert('작성자만 삭제 및 수정이 가능합니다.')
        // }

    
    }

    return(
        <div style={{width: '100%', display: 'flex', height: '100vh'}}>
            <Left>
                <br /><br />
                <BackButton onClick={onBackHandler}>이전</BackButton>{" "}
                <div>
                    <h4 style={{marginLeft : '50px', color: '#AEAEAE', fontWeight: 'normal'}}>{dailyData.diary_write_date}</h4>
                    <a style={{marginLeft: '50px', fontWeight: 'bold', fontSize: '1.5rem'}}>{dailyData.diary_title}</a>
                    <a onClick={onClickDelete} style={{float: 'right', marginRight: '70px', color: '#AEAEAE'}}>삭제</a>
                    {/* <Link to="/diaries/test/write"><a style={{float: 'right', marginRight: '30px', color: '#AEAEAE'}}>수정</a></Link> */}
                </div>
                <DiaryBack>
                    <div>
                        {dailyData.diary_content}
                    </div>
                </DiaryBack>
            </Left>
            <Right>
                <center><h1 style={{marginTop: '50px', height: '100%'}}>분석 결과</h1></center>
                <div>
                    <center><Bar>오늘의 감정 키워드</Bar></center><br />
                    <center><a style={{fontSize: '20px'}}>{dailyData.diary_emotion}</a></center><br />
                    <hr style={{width: '80%', border: 'none', backgroundColor: '#C4C4C4', height: '1px'}}></hr>
                </div>
                <div>
                    <center><Bar>당신의 하루에 맞는 음악</Bar></center>
                    <center><a href={dailyData.playlistURL} target='_blank'><img alt="thumbnail_img" src={dailyData.thumbnailURL} style={{width: '67%', borderRadius: '7px', marginTop: '30px'}}/></a></center><br />
                    <center><a href={dailyData.playlistURL} target='_blank' style={{fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: 'black'}}>{dailyData.playlistTitle}</a></center><br /><br />
                    <hr style={{width: '80%', border: 'none', backgroundColor: '#C4C4C4', height: '1px'}}></hr>
                </div>
                <div>
                    <center><Bar>당신의 하루가 불러온 사이트</Bar></center><br />
                    <center><a href={dailyData.diary_category_site} target='_blank' style={{textDecoration: 'none', fontSize: '20px', fontWeight: 'bold', color: 'black'}}>{dailyData.site_title}</a></center><br />
                    <center><a href={dailyData.diary_category_site} target='_blank' style={{textDecoration: 'none', fontSize: '17px', color: 'blue'}}>{dailyData.diary_category_site}</a></center>
                </div>
            </Right>
        </div>
    )
}

export default DiaryPage;
