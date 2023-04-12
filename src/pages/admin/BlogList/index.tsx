import moment from 'moment';
import React, { useState } from 'react';
import MyPagination from '../../../components/MyPagination';
import { getBlogsPaginationInfo } from '../../../services/homePage';
import { Tag, Blog } from '../../../typings/index';
import './index.less';

interface IProps {}

const BlogAdmin: React.FC<IProps> = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState<number>(0); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(5); //页面大小

  const getData = (param?: { page: number; size: number }) => {
    getBlogsPaginationInfo(param).then((res: any) => {
      if (res?.data?.status) {
        setBlogs(res?.data?.data?.list);
        setTotal(res?.data?.data?.total);
        setPage(res?.data?.data?.pageNum);
        setSize(res?.data?.data?.pageSize);
      }
    });
  };

  const blogList = blogs.map((item: Blog) => {
    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td className='description'>{item.description}</td>
        <td>
          {item.tags?.map((item: Tag) => {
            return <>item</>;
          })}
        </td>
        <td>{moment(item.createTime).format('YYYY-MM-dd')}</td>
        <td>
          <button>edit</button>
          <button>del</button>
        </td>
      </tr>
    );
  });

  return (
    <div className='blog-admin-container'>
      <table className='blog-table'>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>tags</th>
            <th>createTime</th>
            <th>options</th>
          </tr>
        </thead>
        <tbody>{blogList}</tbody>
      </table>
      <MyPagination
        total={total}
        page={page}
        size={size}
        getData={getData}
      ></MyPagination>
    </div>
  );
};
export default BlogAdmin;
