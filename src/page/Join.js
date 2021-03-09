import React, { useState } from 'react';
import Check from '../assets/check.png'
import "../scss/Join.css";
import axios from 'axios';
import constants from '../lib/constants';
import { useHistory } from 'react-router-dom';

function Join() {
    const history = useHistory();

    const [state, setState] = useState({
        id: '',
        name: '',
        pw: '',
        pwck: '',
        email: '',
        detail: '',
        idck: false,
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === "id") {
            setState({
                ...state,
                [name]: value,
                idck: false,
            });
        } else {
            setState({
                ...state,
                [name]: value,
            });
        }





    }

    const onIdCheckHandler = () => {
        let koreanck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        let english = /[a-z]/g;
        let number = /[0-9]/g;
        let reg = /^[a-z0-9]{7,14}$/;

        if (state.id === "") {
            alert('아이디를 입력해주세요.');
        } else if (koreanck.test(state.id) || !reg.test(state.id)) {
            alert('아이디는 영문+숫자조합으로 7~14글자 입력가능합니다.');
        } else if (english.test(state.id) && number.test(state.id) && reg.test(state.id)) {
            axios({
                method: 'POST',
                url: constants.BackUrl + `/login/overLapCheck?id=${state.id}`
            }).then((response) => {
                if (response.data === "fail") {
                    alert("사용해도 괜찮은 아이디입니다.");
                    setState({
                        ...state,
                        idck: true
                    });
                } else {
                    alert("이미 사용중인 아이디입니다.");
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            alert('아이디는 영문+숫자조합으로 7~14글자 입력가능합니다.');
        }
    }

    const onSubmitHandler = () => {
        var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        let reg_pw = /^[a-z0-9]{7,14}$/;

        var email = state.email + "@" + state.detail;
        if (state.id.replace(" ", "") === "") {
            alert("아이디를 입력해주세요.");
        } else if (!state.idck) {
            alert("아이디 중복확인을 해주세요.");
        } else if (state.pw.replace(" ", "") === "" || state.pw !== state.pwck || !reg_pw.test(state.pw)) {
            alert("비밀번호를 다시 확인해주세요.");
        } else if (!reg_email.test(email)) {
            alert("이메일을 다시 확인해주세요.");
        } else {
            axios({
                method: 'POST',
                url: constants.BackUrl + `/login/localSignup`,
                data: {
                    email: state.email+"@"+state.detail,
                    id: state.id,
                    logintype: "local",
                    profileimage: "string",
                    name: state.name,
                    pwd: state.pw,
                    token: "local"
                }
            }).then((response) => {
                alert("해당 이메일로 인증번호가 보내졌습니다.\n최초 로그인시 확인하는 작업이며, 해당 인증번호를 입력하여 로그인해주세요.")
                history.push(`/`);
            }).catch((error) => {
                console.log(error);
            })
        }


    }

    return (
        <div className="join_container">
            <h2>회원가입</h2>
            <table className="join_inner">
                <colgroup>
                    <col style={{ width: "150px" }} />
                    <col style={{ width: "220px" }} />
                    <col style={{ width: "180px" }} />
                </colgroup>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td><input type="text" className="join_input" name="id" value={state.id} onChange={onChangeHandler} /></td>
                        <td><button className="id_check_btn" onClick={onIdCheckHandler}><img src={Check} alt="check" align="center" /> 중복확인</button></td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td><input type="text" className="join_input" name="name" value={state.name} onChange={onChangeHandler} /></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="password" className="join_input" name="pw" value={state.pw} onChange={onChangeHandler} /></td>
                        <td className="pw_limit">(영문+숫자 7-14글자 제한)</td>
                    </tr>
                    <tr>
                        <td>비밀번호 확인</td>
                        <td><input type="password" className="join_input" name="pwck" value={state.pwck} onChange={onChangeHandler} /></td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td className="email_td"><input type="text" className="join_input" name="email" value={state.email} onChange={onChangeHandler} /> @</td>
                        <td><input type="text" className="join_input" name="detail" value={state.detail} onChange={onChangeHandler} /></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            <button className="join_btn" onClick={onSubmitHandler}>가입하기</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Join;