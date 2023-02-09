import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
//import Layout from "./Layout/Layout";
//import Header from "./Layout/Header";
//import { useDispatch } from 'react-redux';
//import { registerUser } from '../../../_actions/user_action';

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
    font-size: 14px;
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

const CheckDuplicateButton = styled.button`
    color: #8F8F8F;
    background: #F5F5F5;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    margin-left: 30px ;
    padding-left: 10px;
    
    &:hover {
        cursor: pointer;
    }
    &:focus{
        box-shadow: 0 0 0 1px gray;
    }
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



function RegisterPage(props) {
    //const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usableId, setUsableId] = useState(false);


    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const dupIdCheck = () =>{
        alert('dup');

        // duplicationCheckAPI(id) //dup check API
        // .then((response) => {
        //     console.log(response)
        //     if(response === false){
        //         alert('사용 가능한 아이디입니다.'); 
                    //< Instead of alert, needs to consider colored texts >
        //         setUsableId(response);
        //     }else{
        //         alert('중복된 아이디입니다.');
        //         setUsableId(response);
        //         setId('');
        //     }
        //     console.log('중복체크');
        // })

    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
        }
        if(id === ''){
            return alert('아이디를 입력해주세요.');
        }
        else if(setUsableId(false)){
            return ('아이디 중복 확인을 해주세요.');
        }
        //Pending: <This body never used in fetch>
        // let body = {
        //     id: Id,
        //     password: Password,
        //     confirmPassword: ConfirmPassword,
        // }

        console.log("Submit Button Click"); //확인용

        //<fetch 주소 부분에다 register API 주소를 달면 됩니다!>
        //ex) fetch('http://10.58.4.36:8000/users/signup', ...

        fetch("http://localhost:3000/members/new", { 
            method: "POST",
            body: JSON.stringify({
                user_id: id,
                user_password: password,
                //Pending: don't know {this.state} is working
                // id: this.state.Id,
                // password: this.state.Password,
            }),
        })
            .then((response) => response.json()) // response: HTTP response object. get the data of object by json()
            .then((result) => console.log("결과: ", result))
            .then(response => {
                alert('가입되셨습니다.');
            })
            .catch((error) => {
                alert('error:', error);
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
                            <h2 align="center">회원가입</h2><br />
                        </div>
                        <form style={{ display: 'flex', flexDirection: 'column'}} >
                            <Label>아이디</Label> 
                            <div style={{ display:'flex', flexDirection: 'row'}}>
                            <Input type='text' size ='65' value={id} onChange={onIdHandler} placeholder='6~15자까지 영문자(소문자), 숫자 사용 가능합니다.'/>
                            <CheckDuplicateButton onClick={dupIdCheck}> &#10004; 중복 확인</CheckDuplicateButton>
                            </div>
                            <br/><br/>

                            <Label>비밀번호</Label>
                            <Input type='password' value={password} onChange={onPasswordHandler} placeholder='1개 이상의 특수문자를 포함하고 8자리 이상, 40자 이하여야 합니다.'/><br /><br />
                            <Label>비밀번호 확인</Label>
                            <Input type='password' value={confirmPassword} onChange={onConfirmPasswordHandler} placeholder='비밀번호 확인을 위해 비밀번호를 한 번 더 입력하세요.'/><br /><br /><br />
                            
                            <center> 
                                <div>
                                    <SubmitButton type='submit' onClick={onSubmitHandler} formAction='members/login'>
                                        완료
                                    </SubmitButton>
                                    <br></br>
                                    <Link to="/index">
                                        <CancelButton > 취소</CancelButton>
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