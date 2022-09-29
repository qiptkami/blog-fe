import classnames from "classnames";
import React, { useState } from "react";
import "./index.less";

const BlogRanking: React.FC = () => {
  return (
    <div className="blog-ranking">
      <div className="blog-ranking-header">分类</div>
      <div className="blog-ranking-body">
        <div className="blog-ranking-item">
          <div className="blog-ranking-item-icon"></div>
          <div className="blog-ranking-item-name">React</div>
          <div className="blog-ranking-item-num">11</div>
        </div>
      </div>
    </div>
  );
};

export default BlogRanking;
