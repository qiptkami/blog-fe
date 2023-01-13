import { useEffect, useState } from 'react';
import { getTypesAndBlogs } from '../../services/typePage';
import TypeList from '../../components/TypeList';
import { useNavigate } from 'react-router-dom';
import { Type, Blog } from '../../typings/index';
import { TagFilled } from '@ant-design/icons';

import './index.less';

const TypePage: React.FC = () => {
  const navigate = useNavigate();
  const [types, setTypes] = useState<Type[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllType();
  };

  const getAllType = () => {
    getTypesAndBlogs().then((res) => {
      if (res?.data?.status) {
        setTypes(res?.data?.data);
      }
    });
  };
  const blogList = (blogs?: Blog[]) => {
    return blogs?.map((blog: Blog) => {
      return (
        <div
          className='type-list-blog'
          key={blog.id}
          onClick={() => {
            navigate(`/blog/${blog.id}`);
          }}
        >
          <div className='type-list-blog-title'>{blog.title}</div>
          <div className='type-list-blog-desc'> {blog.description}</div>
        </div>
      );
    });
  };
  const list = types.map((type) => {
    return (
      //点击锚点跳转要加id
      <div className='type-item' key={type.id} id={type.name}>
        <a className='type-item-title' href={`#${type.name}`}>
          <TagFilled style={{ color: '#0085a1' }} />
          <span className='type-item-title-name'>{type.name}</span>
        </a>
        <div className='type-item-list'>
          <>{blogList(type?.blogs)}</>
        </div>
      </div>
    );
  });

  return (
    <div className='type-container'>
      <div className='type-info-header'></div>
      <div className='type-info-body'>
        <div className='type-info-wrap'>
          <TypeList data={types} />
          <div className='type-info-list'>{list}</div>
        </div>
      </div>
    </div>
  );
};
export default TypePage;
