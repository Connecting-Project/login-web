import React, {useContext, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import constants from '../lib/constants';
import { GlobalStateContext } from '../App';

function GithubLogin(){

    const {setLoginState} = useContext(GlobalStateContext);
    const history = useHistory();
    const location = useLocation();

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });

    const code = query.code;

    useEffect(()=>{
        axios({
            method: 'POST',
            url: constants.BackUrl + `/login/github?code=${code}`,
        }).then((response)=>{
            // sesssionStorageCustom.setJsonItem('user',{
            //     type: 'github',
            //     id : response.data.id,
            //     email : response.data.email,
            //     name : response.data.nickname,
            //     profile_image: response.data.profile_image ? response.data.profile_image : 'https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg',
            //     token : response.data.token,
            // });
            setLoginState(true);
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        });

        // axios({
        //     method:'POST',
        //     url:`https://github.com/login/oauth/access_token?client_id=fd299d60e9868bcaf31f&client_secret=add25c587f5c514361ad98a0b73af93def10c787&code=${code}`,
        //     headers :{
        //         Accept: "application/json",
        //     }
        // }).then((response)=>{
        //     console.log(response);
        // }).catch((error)=>{
        //     console.log(error);
        // })
    });

    return(
        <>
            github login
        </>
    )
}

export default GithubLogin;