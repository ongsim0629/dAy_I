import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import Test from "./thumbnail.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const onClickDelete = (event) => {
        event.preventDefault();
        
        alert('삭제 버튼 누름');
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
                    <h4 style={{marginLeft : '50px', color: '#AEAEAE', fontWeight: 'normal'}}>2023/02/10</h4>
                    <a style={{marginLeft: '50px', fontWeight: 'bold', fontSize: '1.5rem'}}>사용자가 작성한 제목</a>
                    <a onClick={onClickDelete} style={{float: 'right', marginRight: '70px', color: '#AEAEAE'}}>삭제</a>
                    <Link to="/diaries/test/write"><a style={{float: 'right', marginRight: '30px', color: '#AEAEAE'}}>수정</a></Link>
                </div>
                <DiaryBack>
                    <center><div style={{position : 'absolute', left:'50%', top: '50%', transform: 'translate(-50%,-50%)'}}>하이하이</div></center>
                </DiaryBack>
            </Left>
            <Right>
                <center><h1 style={{marginTop: '50px', height: '100%'}}>분석 결과</h1></center>
                <div>
                    <center><Bar>오늘의 감정 키워드</Bar></center><br />
                    <center><a style={{fontSize: '20px'}}>행복</a></center><br /><br />
                    <hr style={{width: '80%', border: 'none', backgroundColor: '#C4C4C4', height: '1px'}}></hr>
                </div>
                <div>
                    <center><Bar>당신의 하루에 맞는 음악</Bar></center>
                    <center><a href="https://youtu.be/cbuZfY2S2UQ" target='_blank'><img alt="thumbnail_img" src={Test} style={{width: '67%', borderRadius: '7px', marginTop: '15px'}}/></a></center>
                    <center><a href="https://youtu.be/cbuZfY2S2UQ" target='_blank' style={{fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: 'black'}}>[ 𝑷𝒍𝒂𝒚𝒍𝒊𝒔𝒕 ] 코딩할때 듣기 좋은 노래</a></center><br /><br />
                    <hr style={{width: '80%', border: 'none', backgroundColor: '#C4C4C4', height: '1px'}}></hr>
                </div>
                <div>
                    <center><Bar>당신의 하루가 불러온 사이트</Bar></center><br />
                    <center><a href="http://jobkorea.co.kr" target='_blank' style={{textDecoration: 'none', fontWeight: 'bold', color: 'black'}}>대학생 인턴 채용, 잡코리아 - 실시간 채용정보 잡코리아</a></center>
                    <center><a href="http://jobkorea.co.kr" target='_blank' style={{textDecoration: 'none', color: 'blue'}}>jobkorea.co.kr</a></center>
                </div>
            </Right>
        </div>
    )
}

export default DiaryPage;