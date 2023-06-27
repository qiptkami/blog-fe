import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getBlogsList, queryBlog } from '../../../../services/homePage';
import MyPagination from '../../../../components/MyPagination';
import BlogItem from './BlogItem';
import './index.less';

const BlogList: React.FC = () => {
  const location = useLocation();
  const [total, setTotal] = useState<number>(0); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(5); //页面大小
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (location.state) {
      queryBlog({ query: location.state.query }).then((res: any) => {
        setData(res.data.data.list);
      });
    } else {
      getData({ page: page, size: size });
    }
  }, [location]);

  const getData = (param?: { page: number; size: number }) => {
    getBlogsList(param).then((res) => {
      if (res?.data?.status) {
        setData(res?.data?.data?.list);
        setTotal(res?.data?.data?.total);
        setPage(res?.data?.data?.pageNum);
        setSize(res?.data?.data?.pageSize);
      }
    });
  };

  const blogs = data.length
    ? data.map((item: any) => {
        return <BlogItem key={item.id} blog={item}></BlogItem>;
      })
    : // <div className='loading-animation'>  </div>
      null;

  return (
    <div className='blog-list-container'>
      {blogs}
      <MyPagination
        total={total}
        page={page}
        size={size}
        onRequest={getData}
      ></MyPagination>
    </div>
  );
};

export default BlogList;
