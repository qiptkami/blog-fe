import React, { useState, useEffect } from 'react';
import './index.less';

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>({});

  const handleClick = (id: number) => {};

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    setUserInfo({
      avatar: 'https://i.loli.net/2021/09/22/Sy8wbjzfPk4hpeG.jpg',
      username: 'qiptkami',
      sign: '这个人很懒，什么都没有留下',
    });
  };
  return JSON.stringify(userInfo) === '{}' ? null : (
    <div className='user-info'>
      <div className='user-info-avatar'>
        <img
          alt='user avatar'
          className='user-info-avatar-img'
          style={{ height: '100%', width: '100%' }}
          src={userInfo.avatar}
        />
      </div>
      <div className='user-info-username'>{userInfo.username}</div>
      <div className='user-info-sign'>{userInfo.sign}</div>
    </div>
  );
};

export default UserInfo;
