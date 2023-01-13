import { ClockCircleFilled, EyeFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blog } from '../../../../../typings/index';
import moment from 'moment';
import './index.less';

interface Props {
  blog: Blog;
}

const BlogItem: React.FC<Props> = ({ blog }) => {
  const navigate = useNavigate();
  const handleClickBlog = (id: number) => {
    navigate(`/blog/${id}`);
  };
  const handleClickType = (id: number) => {
    navigate(`/types`);
  };
  return (
    <div className='blog-item'>
      <div className='blog-item-content'>
        <span
          className='blog-item-title'
          onClick={() => handleClickBlog(blog.id)}
        >
          {blog.title}
        </span>
        <div
          className='blog-item-desc'
          onClick={() => handleClickBlog(blog.id)}
        >
          {blog.description}
        </div>
        <div className='blog-item-info'>
          <span className='blog-item-time'>
            {moment(blog.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </span>
          <span className='blog-item-views'>
            <EyeFilled />
            {blog.views}
          </span>
          <div
            className='blog-item-types'
            onClick={() => handleClickType(blog?.type?.id ?? 0)}
          >
            <span className='blog-item-types-info'>{blog?.type?.name}</span>
          </div>
        </div>
      </div>
      <img className='blog-item-img' src={blog.firstPicture} alt='' />
    </div>
  );
};

export default BlogItem;
