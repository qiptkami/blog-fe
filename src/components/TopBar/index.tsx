import { useNavigate, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import './index.less';

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeUrl, setActiveUrl] = useState<string>(
    `/${location.pathname.split('/')[1]}`
  );

  useEffect(() => {
    setActiveUrl(`/${location.pathname.split('/')[1]}`);
  }, [location]);

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
    </div>
  );
};

export default TopBar;
