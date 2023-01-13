import { ClockCircleFilled, EyeFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blog, Tag } from '../../../../../typings/index';
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

  return (
    <div className='blog-item'>
      <div className='blog-item-content'>
        <div className='blog-item-header'>
          <span
            className='blog-item-title'
            onClick={() => handleClickBlog(blog.id)}
          >
            {blog.title}
          </span>
          <a className='blog-item-tags' href={`/tags/#${blog.tag?.name}`}>
            <span className='blog-item-tags-info'>{blog?.tag?.name}</span>
          </a>
        </div>
        <div className='blog-item-info'>
          <span className='blog-item-time'>
            {moment(blog.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
        <div
          className='blog-item-desc'
          onClick={() => handleClickBlog(blog.id)}
        >
          {blog.description}
        </div>
        <div
          className='blog-item-preview'
          onClick={() => handleClickBlog(blog.id)}
        >
          {blog.content?.substring(0, 40)}
        </div>
      </div>
      <img className='blog-item-img' src={blog.firstPicture} alt='' />
    </div>
  );
};

export default BlogItem;
