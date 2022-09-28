import classnames from "classnames";
import React, { useState } from "react";
import BlogList from "./components/BlogList";
import "./index.less";

const HomePage: React.FC = () => {
  return (
    <body className="home-page-container">
      <div className="home-page-blog">
        <BlogList />
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
