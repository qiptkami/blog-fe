import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/loginService';
import classNames from 'classnames';

import './index.less';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const handleUnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrMsg('');
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrMsg('');
  };

  const handleLogin = () => {
    if (username === '' || password === '') {
      return;
    }

    login({ username: username, password: password }).then((res: any) => {
      if (res.status === 200) {
        const user = res.data.value;
        if (user === -1) {
          setErrMsg(res.data.message);
          return;
        }

        //存储token
        localStorage.setItem('userInfo', JSON.stringify(user));
        //登录成功
        navigate('/admin/home');
      }
    });
  };

  const handleSignUp = () => {};

  return (
    <div className='login-container'>
      <div className='login-form'>
        <div className='login-container-header'>Login</div>
        <div className='login-container-content'>
          <div className='username-input'>
            <label className='username-input-title' htmlFor='username'>
              Username
            </label>
            <div className='username-input-body'>
              <i className={classNames('username-icon', 'iconfont')}>
                &#xe6dd;
              </i>
              <input
                id='username'
                type='text'
                autoComplete='off'
                value={username}
                placeholder='Type your username'
                className='username-input-content'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUnameChange(e)
                }
              />
            </div>
          </div>
          <div className='password-input'>
            <label className='password-input-title' htmlFor='password'>
              Password
            </label>
            <div className='password-input-body'>
              <i className={classNames('password-icon', 'iconfont')}>
                &#xe6d5;
              </i>
              <input
                id='password'
                type='password'
                autoComplete='off'
                value={password}
                placeholder='Type your password'
                className='password-input-content'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handlePwdChange(e)
                }
              />
            </div>
          </div>
          <div className='login-forgot'>Forgot password?</div>
          <div className='login-error-msg'>{errMsg}</div>
          <button className='login-button' onClick={handleLogin}>
            登 录
          </button>
          {/* <div>Or Login Using</div>
          <div>
            <i className={classNames('qq-icon', 'iconfont')}>&#xe667;</i>
          </div> */}
          <div className='signup-button' onClick={handleSignUp}>
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
