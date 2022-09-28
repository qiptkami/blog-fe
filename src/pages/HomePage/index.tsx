import classnames from "classnames";
import React, { useState } from "react";
import "./index.less";

const HomePage: React.FC = () => {
  return (
    <body className="home-page-container">
      <div className="home-page-blog">
        <div className="home-page-blog-title">
          <div>博客</div>
          <div>共 total 篇</div>
        </div>
        <div className="home-page-blog-list">blog-list</div>
      </div>
      <div className="home-page-info">
        <div className="home-page-user-info">个人信息</div>
        <div className="home-page-ranking-info">博客排行榜</div>
        <div className="home-page-types-info">博客分类标签</div>
      </div>
    </body>
  );
};

export default HomePage;
