import React, {useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Login from './page/Login';
import Join from './page/Join';
import LoginResult from './page/LoginResult';

import KakaoLogin from './component/KakaoLogin';
import GithubLogin from './component/GithubLogin';

import sessionStorageCustom from './lib/sessionStorageCustom';
import RestrictRoute from './component/RestrictRoute';

export const GlobalStateContext = React.createContext(null);

function App() {

  const [loginState, setLoginState] = useState(Boolean(sessionStorageCustom.getJsonItem('user')));


  return (
    <div className="App">
    <GlobalStateContext.Provider value={{ loginState, setLoginState }}>
      <Switch>
        {console.log(loginState)}
        <RestrictRoute exact path="/" component={Login} fallback={() => <Redirect to={`/loginresult`} />} isAllow={!loginState}/>
        <RestrictRoute path="/join" component={Join} fallback={() => <Redirect to={`/loginresult`} />} isAllow={!loginState}/>
        <RestrictRoute path="/kakao_login" component={KakaoLogin} fallback={() => <Redirect to={`/loginresult`} />} isAllow={!loginState}/>
        <RestrictRoute path="/github_login" component={GithubLogin} fallback={() => <Redirect to={`/loginresult`} />} isAllow={!loginState}/>
        <Route exact path={"/loginresult"} component={LoginResult} />
      </Switch>
      </GlobalStateContext.Provider>
    </div>
  );
}

export default App;
