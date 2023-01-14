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

  const tags = (tags?: Tag[]) => {
    return tags?.map((tag: Tag) => {
      return (
        <a className='blog-item-tags' key={tag.id} href={`/tags/#${tag?.name}`}>
          <span className='blog-item-tags-info'>{tag?.name}</span>
        </a>
      );
    });
  };

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
        </div>
        <div className='blog-item-info'>
          <span className='blog-item-time'>
            {moment(blog.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
        <div
          className='blog-item-desc'
        >
          {blog.description}
        </div>
        <div
          className='blog-item-preview'
        >
          {blog.content?.substring(0, 40)}
        </div>
        {tags(blog?.tags)}
      </div>
      <img className='blog-item-img' src={blog.firstPicture} alt='' />
    </div>
  );
};

export default BlogItem;
