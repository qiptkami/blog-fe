import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Blog, Tag } from '../../../../../typings/index';
import moment from 'moment';
import './index.less';
import classNames from 'classnames';
import { scrollToAnchor } from '../../../../../utils/scrollToAnchor';
import unknown from '../../../../../assets/img/unknown.png';

interface Props {
  blog: Blog;
}

const BlogItem: React.FC<Props> = ({ blog }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [src, setSrc] = useState<string | undefined>('');

  useEffect(() => {
    if (!blog?.firstPicture) {
      setSrc(unknown);
      return;
    }
    setSrc(blog?.firstPicture);
  }, [blog]);

  const tags = (tags?: Tag[]) => {
    return tags?.map((tag: Tag) => {
      return (
        <div
          className='blog-item-tag'
          key={tag.id}
          onClick={() => {
            scrollToAnchor(location.pathname, '/tags', tag?.name, navigate);
          }}
        >
          <span className='blog-item-tag-info'>{tag?.name + ' '}</span>
        </div>
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
          <i className={classNames('iconfont', 'icon-calendar')}>&#xe62a;</i>
          <span className='blog-item-time'>
            {moment(blog.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
        <div className='blog-item-desc'>{blog.description}</div>
        <div className='blog-item-tags'>
          <i className={classNames('iconfont', 'icon-tags')}>&#xe887;</i>
          {tags(blog?.tags)}
        </div>
      </div>
      <img
        className='blog-item-img'
        src={src}
        alt=''
        onError={() => {
          setSrc(unknown);
        }}
      />
    </div>
  );
};

export default BlogItem;
