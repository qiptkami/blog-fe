import { HomeOutlined, TagsOutlined, BlockOutlined, InfoOutlined } from '@ant-design/icons';
import React from 'react';

const TopBar: React.FC = () => {
  const handleSubmit = () => {

  }
  return (
    <header className="ui inverted attached segment m-padded-tb-mini m-shadow-small">
      <div className="ui container">
      <div className="ui inverted secondary stackable menu"> 
      {/* <!--stackable手机移动端相应，屏幕小时会将内容堆叠到一起--> */}
        <h2 className="ui teal header item">Blog</h2>
        <a href="@{/index}" className="{activeUri=='index'?'active m-item item m-mobile-hide':'m-item item m-mobile-hide'}">
        <HomeOutlined />首页</a>
        <a href="@{/types/-1}" className="{activeUri=='types'?'active m-item item m-mobile-hide':'m-item item m-mobile-hide'}">
        <TagsOutlined />分类</a>
        <a  href="@{/archives}" className="{activeUri=='archives'?'active m-item item m-mobile-hide':'m-item item m-mobile-hide'}">
        <BlockOutlined />归档</a>
        <a href="@{/about}" className="{activeUri=='about'?'active m-item item m-mobile-hide':'m-item item m-mobile-hide'}">
        <InfoOutlined />关于我</a>
        <div className="right m-item item m-mobile-hide">
          <form name="search" action="@{/search}" method="post" target="_blank">
            <div className="ui icon inverted input m-margin-tb-tiny">
              <input type="text" name="query" placeholder="Search..." value="query"/>
              <i onClick={handleSubmit} className="search icon link"></i>
            </div>
          </form>
        </div>
      </div>
  </div>
    <a className="ui menu toggle black icon button m-right-top m-mobile-show">
        <i className="sidebar icon"></i>
    </a>
    </header>
  );
}

export default TopBar;