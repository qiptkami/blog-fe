import { ClockCircleFilled, EyeFilled } from "@ant-design/icons";
import classnames from "classnames";
import React, { useState } from "react";
import "./index.less";

interface IBlog {
  title: string;
  description: string;
  avatar: string;
  username: string;
  createAt: string;
  views: number;
  types: string[];
  img: string;
}

interface Props {
  blog: IBlog;
}

const BlogItem: React.FC<Props> = ({ blog }) => {
  return (
    <div className="blog-item">
      <div className="blog-item-content">
        <div className="blog-item-title"> {blog.title} </div>
        <div className="blog-item-desc"> {blog.description} </div>
        <div className="blog-item-user">
          <div className="blog-item-avatar">{blog.avatar}</div>
          <div className="blog-item-username">{blog.username}</div>
          <div className="blog-item-time">
            <ClockCircleFilled />
            {blog.createAt}
          </div>
          <div className="blog-item-views">
            <EyeFilled />
            {blog.views}
          </div>
          <a target="_blank" className="blog-item-types">
            <span className="blog-item-types-info">{blog.types}</span>
          </a>
        </div>
      </div>
      <div className="blog-item-img"> {blog.img} </div>
    </div>
  );
};

export default BlogItem;
