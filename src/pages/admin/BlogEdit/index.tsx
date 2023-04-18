import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkDownEditor from '../../../components/MarkDownEditor';
import { getBlogInfo } from '../../../services/homePage';
import { Blog } from '../../../typings/index';
import './index.less';

interface IProps {}

const BlogAdmin: React.FC<IProps> = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>();

  const getBlog = (id: number) => {
    getBlogInfo(id).then((res: any) => {
      if (res.data.status) {
        setBlog(res.data.data);
      }
    });
  };
  useEffect(() => {
    getBlog((id && parseInt(id)) || 0);
  }, [id]);

  return (
    <div className='blog-editor-container'>
      <MarkDownEditor content={blog?.content}></MarkDownEditor>
    </div>
  );
};
export default BlogAdmin;
