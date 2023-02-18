import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
//import { useDispatch } from 'react-redux';
//import { registerUser } from '../../../_actions/user_action';

//0. 아래의 기능이 아직 미완성이므로 비밀번호 입력시 오류 발생함 
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
    font-family: AbeeZee;
    margin: 4px;
`;

const IdInput = styled.input`
    color: #999999;
    margin: 1px 0px;
    padding: 8px 100px 3px 0px;
    background-color:#E8E8E8;
    border:none;
    border-radius: 4px;
    border-width: 1.4px;
    padding-left: 14px;
    font-size: 14px;
    font-family: AbeeZee;
`;

const Input = styled.input`
    color: #999999;
    padding: 8px 100px 3px 0px;
    margin: 1px 0px;
    background: white;
    border-radius: 4px;
    border-width: 1.4px;
    border-color: #CCCCCC;
    padding-left: 14px;
    text-align: left;
    font-family: AbeeZee;
`;

const SubmitButton = styled.button`
    color: white;
    font-weight: bold;
    width:270px;
    margin-bottom: 5px;
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

function EditPage(props) {
    //const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 비밀번호 특수문자 검사를 위한 정규식표현.
    //const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    // 특수문자 1자 이상, 전체 8자 이상일것.
    //const isValidPassword = (password.length >= 8 && password.length<=40 ) && specialLetter >= 1;

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onPasswordBlurHandler = (event) =>{
        if(password){ //pwd값이 존재하면
            var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,40}$/
        if(regExp.test(event.Target.value)===true){
            alert('test');
        }
        else{}
        }
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
        }
        

        console.log("Submit Button Click"); //확인용

        //<fetch 주소 부분에다 register API 주소를 달면 됩니다!>
        //ex) fetch('http://10.58.4.36:8000/users/signup', ...

        fetch("http://localhost:3000", { 
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
            <div >
                <div style={{ 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    width: '100%', height: '100vh', position:'fixed'
                }}>
                    <div>
                        <div>
                            <h1 align="center" style={{marginTop:'50px'}}>회원정보 수정</h1><br />
                        </div>
                        <form style={{ display: 'flex', flexDirection: 'column'}} >
                            <Label>아이디</Label> 
                            <div style={{ display:'flex', flexDirection: 'row'}}>
                            <IdInput type='text' size ='70' placeholder='해당 유저의 ID를 dp해야 함' disabled/>
                            
                            </div>
                            <br/><br/>

                            <Label>비밀번호</Label>
                            <Input type='password' defaultValue={password|| ''} onChange={onPasswordHandler} onBlur={onPasswordBlurHandler} placeholder='1개 이상의 특수문자를 포함하고 8자리 이상, 40자 이하여야 합니다.'/><br /><br />
                            <Label>비밀번호 확인</Label>
                            <Input type='password' defaultValue={confirmPassword|| ''} onBlur={onConfirmPasswordHandler} placeholder='비밀번호 확인을 위해 비밀번호를 한 번 더 입력하세요.'/><br /><br /><br />
                            

                            <div style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <SubmitButton type='submit' onClick={onSubmitHandler} >
                                    완료
                                {/* 완료 클릭 이후 Mypage로 가야 함. formAction? */}
                                </SubmitButton>
                                <br></br>
                                <Link to="/index">
                                    {/* /index는 테스트용. 원래 Mypage로 가야 함 */}
                                    <CancelButton > 취소</CancelButton>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPage;