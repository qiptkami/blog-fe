import moment from 'moment';
import React, { useState } from 'react';
import MyTable from '../../../components/MyTable';
import { getBlogsPaginationInfo } from '../../../services/homePage';
import { Tag, Blog } from '../../../typings/index';
import './index.less';

interface IProps {}

const BlogAdmin: React.FC<IProps> = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState<number>(0); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(5); //页面大小

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
    },
    {
      title: 'description',
      dataIndex: 'description',
    },
    {
      title: 'tags',
      dataIndex: 'tags',
      render: (_: any) => {
        return _.tags.map((tag: Tag) => {
          return <div key={tag.id}>{tag.name}</div>;
        });
      },
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
      render: (_: any) => (
        <div>{moment(_.createTime).format('YYYY-MM-DD')}</div>
      ),
    },
    {
      title: 'options',
      dataIndex: 'options',
      render: (_: any) => (
        <div>
          <button>edit</button>
          <button>del</button>
        </div>
      ),
    },
  ];

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

  return (
    <div className='blog-admin-container'>
      <div className='blog-table'>
        <MyTable
          total={total}
          page={page}
          size={size}
          getData={getData}
          dataSource={blogs}
          columns={columns}
        ></MyTable>
      </div>
    </div>
  );
};
export default BlogAdmin;
