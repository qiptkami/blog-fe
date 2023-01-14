import { useEffect, useState } from 'react';
import { getAllTag } from '../../services/tagPage';
import TagList from '../../components/TagList';
import { useNavigate } from 'react-router-dom';
import { Tag, Blog } from '../../typings/index';
import { TagFilled } from '@ant-design/icons';

import './index.less';

const TagPage: React.FC = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    getData();
  }, []);

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
      //点击锚点跳转要加id
      <div className='tag-item' key={tag.id} id={tag.name}>
        <a className='tag-item-title' href={`#${tag.name}`}>
          <TagFilled style={{ color: '#0085a1' }} />
          <span className='tag-item-title-name'>{tag.name}</span>
        </a>
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
