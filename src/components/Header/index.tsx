import { useNavigate, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import './index.less';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeUrl, setActiveUrl] = useState<string>(
    `/${location.pathname.split('/')[1]}`
  );

  useEffect(() => {
    setActiveUrl(`/${location.pathname.split('/')[1]}`);
  }, [location]);

  const [jinrishici, setJinrishici] = useState<string>('正在加载今日诗词....');

  useEffect(() => {
    const jinrishici = require('jinrishici');
    jinrishici.load((result: any) => {
      if (result.status === 'success') {
        setJinrishici(result.data.content);
      }
    });
  }, []);

  useEffect(() => {}, [activeUrl]);

  return (
    <div className='header-container'>
      <div className='header-menu'>
        <div
          className={
            activeUrl === '/'
              ? classnames(
                  'header-menu-index',
                  'header-menu-item',
                  'header-active'
                )
              : classnames('header-menu-index', 'header-menu-item')
          }
          onClick={() => {
            navigate('/');
            setActiveUrl('/');
          }}
        >
          <span>首页</span>
        </div>
        <div
          className={
            activeUrl === '/tags'
              ? classnames(
                  'header-menu-tags',
                  'header-menu-item',
                  'header-active'
                )
              : classnames('header-menu-tags', 'header-menu-item')
          }
          onClick={() => {
            navigate('/tags');
            setActiveUrl('/tags');
          }}
        >
          <span>分类</span>
        </div>
        <div className={classnames('header-menu-github', 'header-menu-item')}>
          <a
            href='https://github.com/qiptkami'
            rel='noreferrer'
            target='_blank'
          >
            Github
          </a>
        </div>
      </div>
      <span style={{ position: 'absolute', left: '10px' }}>{jinrishici}</span>
    </div>
  );
};

export default Header;
