import { SearchOutlined } from '@ant-design/icons';
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
  const [query, setQuery] = useState<string>('');
  useEffect(() => {
    if (!location.state) setQuery('');
  }, [location]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (
    e:
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    navigate('/', { state: { query: query } });
  };

  return (
    <div className='header-container'>
      <form className='header-menu-search' onSubmit={(e) => handleSubmit(e)}>
        <input
          className='header-menu-search-input'
          type='text'
          name='query'
          placeholder='Search...'
          value={query}
          autoComplete='off'
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <SearchOutlined
          className='header-menu-search-icon'
          onClick={(e) => handleSubmit(e)}
        />
      </form>
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
            activeUrl === '/types'
              ? classnames(
                  'header-menu-types',
                  'header-menu-item',
                  'header-active'
                )
              : classnames('header-menu-types', 'header-menu-item')
          }
          onClick={() => {
            navigate('/types');
            setActiveUrl('/types');
          }}
        >
          <span>分类</span>
        </div>
        <div
          className={
            activeUrl === '/archives'
              ? classnames(
                  'header-menu-archives',
                  'header-menu-item',
                  'header-active'
                )
              : classnames('header-menu-archives', 'header-menu-item')
          }
          onClick={() => {
            navigate('/archives');
            setActiveUrl('/archives');
          }}
        >
          <span>归档</span>
        </div>
        <div
          className={
            activeUrl === '/about'
              ? classnames(
                  'header-menu-about',
                  'header-menu-item',
                  'header-active'
                )
              : classnames('header-menu-about', 'header-menu-item')
          }
          onClick={() => {
            navigate('/about');
            setActiveUrl('/about');
          }}
        >
          <span>生活</span>
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
