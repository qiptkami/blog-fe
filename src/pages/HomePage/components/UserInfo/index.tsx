import classnames from 'classnames';
import React, { useState } from 'react';
import './index.less';

const UserInfo: React.FC = () => {
  return (
    <div className='user-info'>
      <div className='user-info-avatar'>头像</div>
      <div className='user-info-username'>username</div>
      <div className='user-info-sign'>这个人很懒，什么都没有留下</div>
      <div className='user-info-item'>
        <a>
          <div className='user-info-item-title'>文章</div>
          <div className='user-info-item-num'>数量</div>
        </a>
        <a>
          <div className='user-info-item-title'>标签</div>
          <div className='user-info-item-num'>数量</div>
        </a>
      </div>
    </div>
  );
};

export default UserInfo;
