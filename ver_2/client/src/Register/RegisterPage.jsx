import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//1. 중복 체크시에 멘트 dp되는거
//2. 비밀번호 유효성 검사

const Header = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    background-color: #E5E0FF;
`;

const Label = styled.label`
    font-size: 16px;
    color: #373A3C;
`;

const Input = styled.input`
    color: #999999;
    padding: 8px 100px 3px 0px;
    margin: 10px 0px;
    background: white;
    border-radius: 4px;
    border-width: 1.4px;
    border-color: #CCCCCC;
    padding-left: 14px;
    text-align: left;
`;


const SubmitButton = styled.button`
    color: white;
    font-weight: bold;
    width:270px;
    margin-bottom: 20px;
    padding: 5px 1px;
    background: #A2A1FF;
    font-size:1.2rem;
    font-weight: bold;
    border:none;
    border-radius: 7px;
    &:hover {
        cursor: pointer;
    }
    &:focus{
        box-shadow: 0 0 0 1px gray;
    }
`;

const CancelButton = styled.button`
    color: #AEAEAE;
    font-weight: bold;
    width:270px;
    padding: 5px 1px;
    background: #E5E5E5;
    font-size:1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 7px;
    &:hover {
        cursor: pointer;
    }
    &:focus{
        box-shadow: 0 0 0 1px gray;
    }
`;
// <유효성 검사 여부 저장>
let isPassword = false;
let isPasswordConfirm = false;

// <공백 제거 함수>
const delSpace = (data) => {
    return data.replace(/\s/g, "");
  };

function RegisterPage(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    // 응답(항상 실행)
let isPassword = false;
let isPasswordConfirm = false;

    const onSubmitHandler = async(event) => {
        event.preventDefault();

        if(id === ''){
            return alert('아이디를 입력해주세요.');
        }

        if (password.length <= 0 || confirmPassword.length <= 0){
        return alert("비밀번호와 비밀번호 확인을 모두 입력해주세요.");
        }

        const regExp = /^(?=.*?[a-zA-Z])(?=.*?[#?!@$ %^&*-]).{8,40}$/;

        isPassword = regExp.test(password);

        if (!isPassword) {
            return alert("형식에 맞지 않는 비밀번호입니다.");
        }

        if (password === confirmPassword) {
            isPasswordConfirm = true;
        }

        if(!isPasswordConfirm){
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
        }
        

        /*
        // SELECT TEST
        const result = await axios.get('/register') //서버에 요청 보내기!! (비동기로, 요청 보내면 응답 받기 위해 돌고 있는 와중에 다른 코드들도 돌아감. 요청 받을때까지 기다리고 리턴받음)
        console.log(result) //프론트 쪽, 브라우저에서 볼 수 있다!!
        */

        // 회원가입
        const result = await axios.post('/members/new', {
            id: id, //post로 보낼 데이터
            password: password,
            confirmPassword: confirmPassword
        })
        .then((response) => {
            console.log(response);
            alert("회원가입 되었습니다. 로그인 해주세요:D");
            console.log("회원가입 성공");
            navigate("/members/login");
        })
        .catch((error) => {
            alert('이미 사용 중인 아이디 입니다.')
            console.log("로그인 에러 발생", error.response);
        });
        console.log("Submit Button Click"); //확인용
    }


    return (
        <div>
            <Header></Header>
            <div>
                <div style={{ 
                    position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    width: '100%', height: '110vh'
                }}>
                    <div>
                        <div>
                            <h1 align="center">회원가입</h1><br />
                        </div>
                        <form style={{ display: 'flex', flexDirection: 'column'}} >
                            <Label>아이디</Label> 
                            <Input type='text' size ='65' value={id} onChange={onIdHandler} placeholder='6~15자까지 영문자(소문자), 숫자 사용 가능합니다.'/>
                            <br/><br/>
                            <Label>비밀번호</Label>
                            <Input type='password' value={password} onChange={onPasswordHandler} placeholder='1개 이상의 특수문자를 포함하고 8자리 이상, 40자 이하여야 합니다.'/><br /><br />
                            <Label>비밀번호 확인</Label>
                            <Input type='password' value={confirmPassword} onChange={onConfirmPasswordHandler} placeholder='비밀번호 확인을 위해 비밀번호를 한 번 더 입력하세요.'/><br /><br />
                            <br /><br /><br />
                            <center> 
                                <div>
                                    <SubmitButton type='submit' onClick={onSubmitHandler} formAction='members/login'>
                                        완료
                                    </SubmitButton>
                                    <br></br>
                                    <Link to="/members/login">
                                        <CancelButton>
                                            취소
                                        </CancelButton>
                                    </Link>
                                </div>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;