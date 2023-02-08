import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

//1. 구분선으로 넣으려고 한 hr태그가 안먹힌다!

const Background = styled.div`
    height: auto;
    width: 100%;
    background: url(/image/main_bg.jpg) no-repeat center;
    background-size: cover;
    background: #c0392b;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #FFDEDE, #A2A1FF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #FFDEDE, #A2A1FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Label = styled.label`
    color: #7286D3;
    font-weight: bold;
`;

const SignUpLink = styled.a`
    color: #5475ED;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

const LoginFormRectangle = styled.div`
    width: 397px;
    height: 341px;
    background-color: #f5f5f5;
    border-radious: 8em;
    box-shadow: 0px 7px 4px #00000040;
    padding: 50px;
`;

const Input = styled.input`
    color: #999999;
    padding: 8px 100px 3px 0px;
    margin: 10px 0px;
    background: white;
    border: none;
    border-radius: 4px;
    border-width: 1.4px;
    border-color: #CCCCCC;
    padding-left: 14px;
    text-align: left;
`;

const LoginButton= styled.button`
    color: white;
    font-weight: bold;
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



function LoginPage(props){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onLoginHandler = (event) =>{
        alert('login');

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
                alert('로그인 완료');
            })
            .catch((error) => {
                alert('error:', error);
            });
    }

    return(
        <div>
            <Background>
                <center > <h1>웹페이지 이름</h1> </center>
                <div style={{ 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    width: '100%', height: '100vh'
                }}>
                    <div>
                        <LoginFormRectangle>
                            <form style={{ display: 'flex', flexDirection: 'column'}} >
                                <center><h1 style={{color:'#616161'}}>User Login</h1></center>
                                <Label>User Id</Label>  
                                <Input></Input> <hr size='10px'/>
                                <Label>Passsword</Label> <hr/>
                                <Input></Input>
                                <LoginButton onClick={onLoginHandler}>Log in</LoginButton> <hr/>
                            </form>
                        </LoginFormRectangle>
                        <Link to="/members/register">
                            <center><SignUpLink >Sign Up</SignUpLink></center>
                        </Link>
                        
                    </div>
                </div>
            </Background>
        </div>
    );

}
export default LoginPage;