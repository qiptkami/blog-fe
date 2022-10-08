import { ClockCircleFilled, EyeFilled } from "@ant-design/icons";
import classnames from "classnames";
import React, { useState } from "react";
import { Blog } from "../../../../../typings/index";
import moment from "moment";
import "./index.less";

interface Props {
  blog: Blog;
}

const BlogItem: React.FC<Props> = ({ blog }) => {
  return (
    <div className="blog-item">
      <div className="blog-item-content">
        <span className="blog-item-title"> {blog.title} </span>
        <div className="blog-item-info">
          <span className="blog-item-time">
            {moment(blog.createTime).format("YYYY-MM-DD HH:mm:ss")}
          </span>
          <span className="blog-item-views">
            <EyeFilled />
            {blog.views}
          </span>
          <a href="#" target="_blank" className="blog-item-types">
            <span className="blog-item-types-info">{blog.type.name}</span>
          </a>
        </div>
        <div className="blog-item-desc"> {blog.description} </div>
      </div>
      <img className="blog-item-img" src={blog.firstPicture} alt="" />
    </div>
  );
};

export default BlogItem;
