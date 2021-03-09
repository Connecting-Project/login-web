import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import Kakao from '../assets/kakao_login.png';
import GithubLogo from '../assets/github_logo.png';

import { GoogleLogin } from 'react-google-login';
import "../scss/Login.css";

import { GlobalStateContext } from '../App';
import sessionStorageCustom from '../lib/sessionStorageCustom';
import constants from '../lib/constants';

function Login(){
    const history = useHistory();
    const { setLoginState } = useContext(GlobalStateContext);

    const [state, setState] = useState({
        id: '',
        pw: '',
    });

    const onMovepage = (str) =>{
        history.push(`/${str}`);
    }

    const resSuccessGoogle = (response) => {
        axios({
            method:'POST',
            url:constants.BackUrl+`/login/google`,
            data:{
                id : response.profileObj.googleId,
                email : response.profileObj.email,
                name : response.profileObj.name,
                access_token : response.accessToken,
                profile_image: response.profileObj.imageUrl,
            }
        }).then((res)=>{
            sessionStorageCustom.setJsonItem('user',{
                type: 'google',
                id : response.profileObj.googleId,
                email : response.profileObj.email,
                name : response.profileObj.name,
                access_token : response.accessToken,
                profile_image: response.profileObj.imageUrl,
            });
            setLoginState(true);
        }).catch((error)=>{
            console.log(error);
        });
    };

    const resFailGoogle = (response) => {
        console.log(response);
    };

    const onLocalLogin = () => {
        axios({
            method:'POST',
            url:constants.BackUrl + `/login/localSignin?id=${state.id}&password=${state.pw}`,
        }).then((response)=>{

            if(response.data.certified === "false"){
                let certifycode = prompt("인증번호를 입력해주세요.","");
                if(response.data.certifycode === certifycode){
                    axios({
                        method: 'POST',
                        url: constants.BackUrl + `/login/localCertify?CertifyCode=${certifycode}&id=${state.id}`
                    }).then((res)=>{
                        if(res.data === "localCertify fail"){
                            alert("인증번호가 틀렸습니다. 다시한번 확인해주세요.");
                        }else{
                            sessionStorageCustom.setJsonItem('user',{
                                type: 'local',
                                id : response.data.id,
                                email : response.data.email,
                                name : response.data.name,
                                profile_image: response.data.profile_image === "string" ? response.data.profile_image : 'https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg',
                                token : response.data.token,
                            });
                            setLoginState(true);
                            history.push(`/loginresult`);
                        }
                    }).then((err)=>{
                        console.log(err);
                    });
                    
                }else if(certifycode === null){
                    
                }else{
                    alert("인증번호를 다시 확인해주세요.");
                }
            }else if(response.data.certified === "true"){
                sessionStorageCustom.setJsonItem('user',{
                    type: 'local',
                    id : response.data.id,
                    email : response.data.email,
                    name : response.data.name,
                    profile_image: response.data.profile_image === "string" ? response.data.profile_image : 'https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg',
                    token : response.data.token,
                });
                setLoginState(true);
                history.push(`/loginresult`);
            }else{
                alert("아이디와 비밀번호를 다시 확인해주세요!");
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    const onLoginHandler = (e) => {
        const {name , value} = e.target;
        setState({
            ...state,
            [name] : value,
        });
    }

    return(
        <div className="login_container">
            <h2>로그인</h2>
            <input type="text" className="login_input" placeholder="아이디" name="id" value={state.id} onChange={onLoginHandler}/>
            <input type="password" className="login_input" placeholder="비밀번호" name="pw" value={state.pw} onChange={onLoginHandler}/>
            <button className="login_btn" onClick={onLocalLogin}>로그인</button>
            <div className="link_btns">
                <span className="mvjoin_btn" onClick={()=>{onMovepage("join")}}>회원가입</span>
                <span className="mvjoin_btn" onClick={()=>{onMovepage("password")}}>비밀번호 찾기</span>
            </div>
            <hr/>
            <h4>SNS 계정으로 로그인</h4>
            <div className="sns_btns">
                <a href="https://kauth.kakao.com/oauth/authorize?client_id=8d49647c4738cb1c7919b1734a1e2121&redirect_uri=https://login.hawaiian-pizza.ml/kakao_login&response_type=code">

                    <img src={Kakao} alt="kakao_btn"/>
                </a>
                <GoogleLogin 
                    clientId="1013284612751-fr56ee6cl3stckocl8m5d2af9h45s2qh.apps.googleusercontent.com"
                    buttonText="로그인"
                    onSuccess={resSuccessGoogle}
                    onFailure={resFailGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="google_login"
                />
                <a href="https://github.com/login/oauth/authorize?client_id=fd299d60e9868bcaf31f&redirect_uri=https://login.hawaiian-pizza.ml/github_login&scope=repo,user">
                    <div className="github_btn">
                        <img src={GithubLogo} alt="githublogo" className="githublogo" align="center"/>
                        <p>로그인</p>
                    </div>
                </a>
            </div>
        </div>
    );

}

export default Login;