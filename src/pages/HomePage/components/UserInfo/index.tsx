import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../../../services/userService';
import { User } from '../../../../typings/index';

import './index.less';

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>();

  const handleClick = (id: number) => {};

  useEffect(() => {
    getUserInfo(1).then((res: any) => {
      if (res.status === 200) {
        const user = res.data.value;
        setUserInfo({
          id: user.id,
          username: user.username,
          email: user.email,
          sign: user.sign,
          avatar: user.avatar,
        });
      }
    });
  }, []);

  return JSON.stringify(userInfo) === '{}' ? null : (
    <div className='user-info'>
      <div className='user-info-avatar'>
        <img
          alt='user avatar'
          className='user-info-avatar-img'
          style={{ height: '100%', width: '100%' }}
          src={userInfo?.avatar}
        />
      </div>
      <div className='user-info-username'>{userInfo?.username}</div>
      <div className='user-info-sign'>{userInfo?.sign}</div>
    </div>
  );
};

export default UserInfo;
