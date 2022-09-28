import { ClockCircleFilled, EyeFilled } from "@ant-design/icons";
import classnames from "classnames";
import React, { useState } from "react";
import "./index.less";

const BlogList: React.FC = () => {
  return (
    <body className="blog-list-container">
      <div className="home-page-blog-title">
        <div>博客</div>
        <div>共 total 篇</div>
      </div>
      <div className="blog-list-body">
        <div className="blog-list-item">
          <div className="blog-list-item-content">
            <div className="blog-list-item-title"> title </div>
            <div className="blog-list-item-desc"> description </div>
            <div className="blog-list-item-user">
              <div className="blog-list-item-avatar">avatar</div>
              <div className="blog-list-item-username">username</div>
              <div className="blog-list-item-time">
                <ClockCircleFilled />
                createAt
              </div>
              <div className="blog-list-item-views">
                <EyeFilled />
                views
              </div>
              <a target="_blank" className="blog-list-item-types">
                <span className="blog-list-item-types-info">types</span>
              </a>
            </div>
          </div>
          <div className="blog-list-item-img"> img </div>
        </div>
        <div className="blog-list-item"></div>
        <div className="blog-list-item"></div>
        <div className="blog-list-item"></div>
        <div className="blog-list-item"></div>
        <div className="blog-list-item"></div>
        <div className="blog-list-item"></div>
        <div className="blog-list-item"></div>
        <div className="blog-list-item"></div>
        <div className="blog-list-item"></div>
      </div>
    </body>
  );
};

export default BlogList;
