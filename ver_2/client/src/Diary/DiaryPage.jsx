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
    background: #F5F5F5;
    margin-top: 20px;
    margin-left: 50px;
    border: none;
    borderRadius: 7px;
    width: 88%;
    height: 70%;
    border-radius: 20px;
    position : relative;
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
    const location = useLocation();
    const dailyData = location.state.dailyData;

    const onClickDelete = async(event) => {
        event.preventDefault();

        await axios.post("/members/delete", {
          id: dailyData.diary_write_id,
          date: dailyData.diary_write_date
        })
        .then((res) => {
          alert('일기가 삭제되었습니다.')
        })
        .catch((error) => {
          console.log(error);
          alert('일기 정보를 가져오는데 실패했습니다.')
        });
        //if (sessionStorage.getItem('user_id') == postData.post_user_id) {
        // if (localStorage.getItem('token') == postData.post_user_id) {
        //     axios.post('/diaries/{id}/delete', {
        //         username: 글쓴이 닉네임,
        //         post_id: 게시글id
        //     })
        //     .then((response) => {
        //         console.log(response);
        //         alert("게시글이 삭제되었습니다.");
        //         navigate("/home");
        //     })
        //     .catch((error) => {
        //         console.log(error.response);
        //     });
        // }
        // else {
        //     alert('작성자만 삭제 및 수정이 가능합니다.')
        // }
    }

    return(
        <div style={{width: '100%', display: 'flex', height: '100vh'}}>
            <Left>
                <Link to="/members/home"><br /><br />
                    <BackButton>이전</BackButton>
                </Link>
                <div>
                    <h4 style={{marginLeft : '50px', color: '#AEAEAE', fontWeight: 'normal'}}>{dailyData.diary_write_date}</h4>
                    <a style={{marginLeft: '50px', fontWeight: 'bold', fontSize: '1.5rem'}}>{dailyData.diary_title}</a>
                    <a onClick={onClickDelete} style={{float: 'right', marginRight: '70px', color: '#AEAEAE'}}>삭제</a>
                    {/* <Link to="/diaries/test/write"><a style={{float: 'right', marginRight: '30px', color: '#AEAEAE'}}>수정</a></Link> */}
                </div>
                <DiaryBack>
                    <center><div style={{position : 'absolute', left:'50%', top: '50%', transform: 'translate(-50%,-50%)'}}>{dailyData.diary_content}</div></center>
                </DiaryBack>
            </Left>
            <Right>
                <center><h1 style={{marginTop: '50px', height: '100%'}}>분석 결과</h1></center>
                <div>
                    <center><Bar>오늘의 감정 키워드</Bar></center><br />
                    <center><a style={{fontSize: '20px'}}>{dailyData.diary_emotion}</a></center><br /><br />
                    <hr style={{width: '80%', border: 'none', backgroundColor: '#C4C4C4', height: '1px'}}></hr>
                </div>
                <div>
                    <center><Bar>당신의 하루에 맞는 음악</Bar></center>
                    <center><a href={dailyData.playlistURL} target='_blank'><img alt="thumbnail_img" src={dailyData.thumbnailURL} style={{width: '67%', borderRadius: '7px', marginTop: '15px'}}/></a></center>
                    <center><a href={dailyData.playlistURL} target='_blank' style={{fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: 'black'}}>{dailyData.playlistTitle}</a></center><br /><br />
                    <hr style={{width: '80%', border: 'none', backgroundColor: '#C4C4C4', height: '1px'}}></hr>
                </div>
                <div>
                    <center><Bar>당신의 하루가 불러온 사이트</Bar></center><br />
                    <center><a href="http://jobkorea.co.kr" target='_blank' style={{textDecoration: 'none', fontWeight: 'bold', color: 'black'}}>사이트 타이틀</a></center>
                    <center><a href="http://jobkorea.co.kr" target='_blank' style={{textDecoration: 'none', color: 'blue'}}>{dailyData.diary_category_site}</a></center>
                </div>
            </Right>
        </div>
    )
}

export default DiaryPage;