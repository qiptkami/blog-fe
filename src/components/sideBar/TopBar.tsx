import { HomeOutlined, TagsOutlined, BlockOutlined, InfoOutlined, SearchOutlined } from '@ant-design/icons';

import React, { useState } from 'react';
import "./TopBar.less"

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
      <div className='header-menu'> {/* <!--stackable手机移动端相应，屏幕小时会将内容堆叠到一起--> */}
        <span className='header-menu-title'>Blog</span>
        <a href='@{/index}' className='header-menu-index'>
          <HomeOutlined />
          <span>首页</span>
        </a>
        <a href='@{/types/-1}' className='header-menu-types'>
          <TagsOutlined />
          <span>分类</span>
        </a>
        <a href='@{/archives}' className='header-menu-archives'>
          <BlockOutlined />
          <span>归档</span>
        </a>
        <a href='@{/about}' className='header-menu-about'>
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