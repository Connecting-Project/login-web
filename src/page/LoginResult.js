import React, {useContext} from 'react';
import Login from './Login';
import sesssionStorageCustom from '../lib/sessionStorageCustom';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import '../scss/LoginResult.css';
import { GlobalStateContext } from '../App';

function LoginResult(){
    const history = useHistory();
    const user = sesssionStorageCustom.getJsonItem('user');
    const { setLoginState } = useContext(GlobalStateContext);

    const onLogout = () => {
        if(user.type === "google"){

        }else if(user.type === "kakao"){

        }else{

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
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>{user.email}</td>
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