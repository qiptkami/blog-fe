import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { login } from '../../../services/admin/loginPage';
import './index.less';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (username === '' || password === '') {
      return;
    }
    login({ username: username, password: password }).then((res: any) => {
      console.log(res);
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
          <button className='login-button' onClick={handleLogin}>
            登 录
          </button>
          <div>Or Login Using</div>
          <div>
            <i className={classNames('qq-icon', 'iconfont')}>&#xe667;</i>
          </div>
          <div className='signup-button' onClick={handleSignUp}>
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
