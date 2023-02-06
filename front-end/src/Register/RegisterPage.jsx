import React, { useState } from 'react';
import styled from "styled-components";
import Layout from "./Layout/Layout";
import Header from "./Layout/Header";
//import { useDispatch } from 'react-redux';
//import { registerUser } from '../../../_actions/user_action';

const Input = styled.input`
    color: #999999;
    padding: 8px 200px;
    background: white;
    border-radius: 4px;
    border-width: 1.4px;
    border-color: #CCCCCC;
`;

const Button = styled.button`
    color: white;
    font-weight: bold;
    padding: 8px 1px;
    background: #A2A1FF;
    font-size:1.2rem;
    border:none;
    border-radius: 7px;
`;

const CancelButton = styled.button`
    color: #AEAEAE;
    font-weight: bold;
    background: #E5E5E5;
    font-size:1.2rem;
    border: none;
    border-radius: 7px;
`;

function RegisterPage(props) {

    //const dispatch = useDispatch();
    

    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
        }

        let body = {
            id: Id,
            password: Password,
            confirmPassword: ConfirmPassword,
        }
        //console.log("Button Click"); //확인용


        //<fetch 주소 부분에다 register API 주소를 달면 됩니다!>
        //ex) fetch('http://10.58.4.36:8000/users/signup', ...

        fetch("http://localhost:3000", { 
            method: "POST",
            body: JSON.stringify({
              id: this.state.Id,
              password: this.state.Password,
            }),
          })
            .then((response) => response.json())
            .then((result) => console.log("결과: ", result))
            .then(response => {
                alert('가입되셨습니다.');
            });
    }


    return (
        <div>
        <Header></Header>
        <div>
            <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'
            }}>

            <div>
                <div>
                    <h1 align="center">회원가입</h1>
                </div>
                <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler} >
                    
                    <label>아이디</label>
                    <Input type='text' value={Id} onChange={onIdHandler} placeholder='6~15자까지 영문자(소문자), 숫자 사용 가능합니다.'/><br />
                    <label>비밀번호</label>
                    <Input type='password' value={Password} onChange={onPasswordHandler} placeholder='1개 이상의 특수문자를 포함하고 8자리 이상, 40자 이하여야 합니다.'/><br />
                    <label>비밀번호 확인</label>
                    <Input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder='비밀번호 확인을 위해 비밀번호를 한 번 더 입력하세요.'/><br /><br /><br />
                    <button formAction='/home'>
                    {/* form Action 안에 login url 넣어주면 됨 */}
                        완료
                    </button><br></br>
                    <button> 취소</button>
                </form>
            </div>
        </div>
        </div>
        </div>
    )
}

export default RegisterPage;