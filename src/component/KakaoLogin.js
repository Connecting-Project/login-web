import React, {useEffect, useContext} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import constants from '../lib/constants';
import { GlobalStateContext } from '../App';

import sessionStorageCustom from '../lib/sessionStorageCustom';

function KakaoLogin(){

    const history = useHistory();
    const location = useLocation();
    const {setLoginState} = useContext(GlobalStateContext);

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });

    const code = query.code;

    useEffect(()=>{
        
        axios({
            method:'GET',
            url:constants.BackUrl+`/login/code?code=${code}`
        }).then((response)=>{
            sessionStorageCustom.setJsonItem('user',{
                type: 'kakao',
                id : response.data.id,
                email : response.data.email,
                name : response.data.nickname,
                profile_image: response.data.profile_image ? response.data.profile_image : 'https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg',
                token : response.data.token,
            });
            setLoginState(true);
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    });

    

    return(<div>{code}</div>);
}

export default KakaoLogin;