import React, {useState} from 'react';
import axios from 'axios';
import constants from '../lib/constants';
import {useHistory} from 'react-router-dom';

import '../scss/Password.css';
function Password(){
    const history = useHistory();

    const [pwSearch, setPwSearch] = useState({
        id: '',
        email: '',
        detail: '',
    });

    const [pboolean, setpBoolean] = useState(true);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === "detail"){
            if(value === "직접입력"){
                setpBoolean(false);
                setPwSearch({
                    ...pwSearch,
                    [name]: '',
                });
            }else{
                setPwSearch({
                    ...pwSearch,
                    [name]: value,
                });
            }
            
        } else {
            setPwSearch({
                ...pwSearch,
                [name]: value,
            });
        }

    };

    const onPasswordSearchHandler = (e) => {
        if(pwSearch.id === ''){
            alert('아이디를 다시 한번 확인해주세요.');
        }else if(pwSearch.email === '' || pwSearch.detail === ''){
            alert('이메일을 다시 한번 확인해주세요.');
        }else {
            axios({
                method:'POST',
                url:constants.BackUrl+`/login/localReset?email=${pwSearch.email}@${pwSearch.detail}&id=${pwSearch.id}`,
            }).then((res)=>{
                if(res.data === "reset success"){
                    alert("새로운 비밀번호가 이메일로 전송되었습니다. \n해당 비밀번호로 로그인을 해주세요.");
                    history.push(`/`);
                }else{
                    alert("아이디와 이메일을 다시 확인해주세요.");
                }
            }).catch((error)=>{
                console.log(error);
            });
        }
    }
    
    return (
        <div className="pw_container">
            <h3>비밀번호 찾기</h3>
            <table className="pws_inner">
                <colgroup>
                    <col style={{ width: "150px" }} />
                    <col style={{ width: "223px" }} />
                    <col style={{ width: "180px" }} />
                </colgroup>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td><input type="text" className="pws_input" name="id" value={pwSearch.id} onChange={onChangeHandler} /></td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td className="email_td"><input type="text" className="pws_input" name="email" value={pwSearch.email} onChange={onChangeHandler} /> @</td>
                        
                        {pboolean && <td>
                    <select name="detail" className="pws_selectbox" onChange={onChangeHandler}>
                        <option value="">도메인 선택</option>
                        <option value="naver.com">naver.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="daum.net">daum.net</option>
                        <option value="nate.com">nate.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="hotmail.com">hotmail.com</option>
                        <option value="lycos.co.kr">lycos.co.kr</option>
                        <option value="empal.com">empal.com</option>
                        <option value="cyworld.com">cyworld.com</option>
                        <option value="yahoo.com">yahoo.com</option>
                        <option value="paran.com">paran.com</option>
                        <option value="dreamwiz.com">dreamwiz.com</option>
                        <option value="직접입력">직접입력</option>
                    </select>
                </td>}
                        {!pboolean && <td><input type="text" className="pws_input" name="detail" value={pwSearch.detail} onChange={onChangeHandler} /></td>}
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            <button className="pws_btn" onClick={onPasswordSearchHandler}>확인</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );

}

export default Password;