import { HomeOutlined, TagsOutlined, BlockOutlined, InfoOutlined, SearchOutlined } from '@ant-design/icons';
import React from 'react';
import "./TopBar.less"

const TopBar: React.FC = () => {
  const handleSubmit = () => {
    alert('Submit')
  }
  return (
    <header className='header-container'>
      <div className='header-menu'> {/* <!--stackable手机移动端相应，屏幕小时会将内容堆叠到一起--> */}
        <h2 className='header-menu-title'>Blog</h2>
        <a href='@{/index}' className='header-menu-index'>
          <HomeOutlined />首页
        </a>
        <a href='@{/types/-1}' className='header-menu-types'>
          <TagsOutlined />分类
        </a>
        <a href='@{/archives}' className='header-menu-archives'>
          <BlockOutlined />归档
        </a>
        <a href='@{/about}' className='header-menu-about'>
          <InfoOutlined />关于我
        </a>
        <div className='header-menu-search'>
          <input className='header-menu-search-input' type='text' name='query' placeholder='Search...' value=''/>
          <SearchOutlined className='header-menu-search-icon' onClick={handleSubmit} />
        </div>
      </div>
    </header>
  );
}

export default TopBar;