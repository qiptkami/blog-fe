import classnames from 'classnames';
import React, { useState } from 'react';
import './index.less';

const Footer: React.FC = () => {
  return (
    <div className='footer-container'>
      <div className='seven wide column'>
        <h4 className='m-text-thin m-text-spaced'>Blog</h4>
        <p className='m-text-thin m-text-spaced m-opacity-mini'>
          这个人很懒，什么都没有留下...
        </p>
      </div>
    </div>
  );
};

export default Footer;
