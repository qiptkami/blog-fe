import { HomeOutlined, TagsOutlined, BlockOutlined, InfoOutlined, SearchOutlined } from '@ant-design/icons';

import classnames from 'classnames'
import React, { useState } from 'react';
import "./index.less"

const TopBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    alert(query)
  }
  return (
    <header className='header-container'>
      <div className='header-menu'>
        <span className={classnames('header-menu-title', 'header-menu-item')}>Blog</span>
        <a href='@{/index}' className={classnames('header-menu-index', 'header-menu-item')}>
          <HomeOutlined />
          <span>首页</span>
        </a>
        <a href='@{/types/-1}'className={classnames('header-menu-types', 'header-menu-item')}>
          <TagsOutlined />
          <span>分类</span>
        </a>
        <a href='@{/archives}' className={classnames('header-menu-archives', 'header-menu-item')}>
          <BlockOutlined />
          <span>归档</span>
        </a>
        <a href='@{/about}' className={classnames('header-menu-about', 'header-menu-item')}>
          <InfoOutlined />
          <span>关于我</span>
        </a>
      </div>
      <form className='header-menu-search' onSubmit={(e)=>handleSubmit(e)}>  
        <input className='header-menu-search-input' type='text' name='query' placeholder='Search...' value={query} onChange={(e)=>{handleChange(e)}}/>
        <SearchOutlined className='header-menu-search-icon' onClick={(e)=>handleSubmit(e)} />
      </form>
    </header>
  );
}

export default TopBar;