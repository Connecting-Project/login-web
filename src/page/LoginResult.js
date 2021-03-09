import React, {useContext} from 'react';
import Login from './Login';
import sesssionStorageCustom from '../lib/sessionStorageCustom';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../scss/LoginResult.css';
import { GlobalStateContext } from '../App';
import constants from '../lib/constants';

function LoginResult(){
    const history = useHistory();
    const user = sesssionStorageCustom.getJsonItem('user');
    const { setLoginState } = useContext(GlobalStateContext);

    const onLogout = () => {
        if(user.type === "kakao"){
            axios({
                method: 'POST',
                url: constants.BackUrl+`/login/kakaoLogout?token=${user.token}`,
            }).then((response)=>{
                setLoginState(false);
                sessionStorage.clear();
                history.push('/');
            }).catch((error)=>{
                console.log(error);
            });
        }else if(user.type){
            setLoginState(false);
            sessionStorage.clear();
            history.push('/');
        }
    };

    const googleLogout = (e) => {
        setLoginState(false);
        sessionStorage.clear();
        history.push('/');
    };

    return(
        <div className="result_container">
            <div className="result_profile">
                <img src={user.profile_image} alt="프로필 이미지"/>
            </div>
            <div>
                <table className="result_table">
                <colgroup>
                    <col style={{ width: "50px" }} />
                    <col style={{ width: "290px" }} />
                </colgroup>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td className="result_content">{user.name}</td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td className="result_content">{user.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="logout_inner">
                {user.type === "google" ? 
                <GoogleLogout
                    clientId="1013284612751-fr56ee6cl3stckocl8m5d2af9h45s2qh.apps.googleusercontent.com"
                    buttonText="로그아웃"
                    onLogoutSuccess={googleLogout}
                >
                </GoogleLogout> : 
                    <button className="logout_btn" onClick={onLogout}>로그아웃</button>
                }
            </div>
        </div>
    );
}

export default LoginResult;