import { useEffect, useState } from 'react';
import { getAllTag } from '../../services/tagPage';
import TagList from '../../components/TagList';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tag, Blog } from '../../typings/index';
import { TagFilled } from '@ant-design/icons';

import './index.less';
import { scrollToAnchor } from '../../utils/scrollToAnchor';

const TagPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    scrollToAnchor(location.pathname, '/tags', location.state, navigate);
  }, [tags]); //因为dom tags来渲染的，所以需要监听tags

  const getData = () => {
    getTags();
  };

  const getTags = () => {
    getAllTag().then((res) => {
      if (res?.data?.status) {
        setTags(res?.data?.data);
      }
    });
  };

  const blogList = (blogs?: Blog[]) => {
    return blogs?.map((blog: Blog) => {
      return (
        <div
          className='tag-list-blog'
          key={blog.id}
          onClick={() => {
            navigate(`/blog/${blog.id}`);
          }}
        >
          <div className='tag-list-blog-title'>{blog.title}</div>
          <div className='tag-list-blog-desc'> {blog.description}</div>
        </div>
      );
    });
  };
  const list = tags.map((tag) => {
    return (
      <div className='tag-item' key={tag.id}>
        <div
          id={tag.name}
          className='tag-item-title'
          onClick={() => {
            scrollToAnchor(location.pathname, '/tags', tag?.name, navigate);
          }}
        >
          <TagFilled style={{ color: '#0085a1' }} />
          <span className='tag-item-title-name'>{tag.name}</span>
        </div>
        <div className='tag-item-list'>
          <>{blogList(tag?.blogs)}</>
        </div>
      </div>
    );
  });

  return (
    <div className='tag-container'>
      <div className='tag-info-header'></div>
      <div className='tag-info-body'>
        <div className='tag-info-wrap'>
          <TagList data={tags} />
          <div className='tag-info-list'>{list}</div>
        </div>
      </div>
    </div>
  );
};
export default TagPage;
