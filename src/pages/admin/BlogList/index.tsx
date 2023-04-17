import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import MyTable from '../../../components/MyTable';
import PopConfirm from '../../../components/Popconfirm';
import { getBlogsPaginationInfo } from '../../../services/homePage';
import { Tag, Blog } from '../../../typings/index';
import './index.less';

interface IProps {}

const BlogAdmin: React.FC<IProps> = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState<number>(0); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(5); //页面大小

  const handleOk = () => {};
  const handelCancel = () => {};

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
    },
    {
      title: 'description',
      dataIndex: 'description',
      render: (_: any) => (
        <span className='description' title={_.description}>
          {_.description}
        </span>
      ),
      width: '60%',
      ellipsis: true,
    },
    {
      title: 'tags',
      dataIndex: 'tags',
      render: (_: any) => {
        return _.tags.map((tag: Tag) => {
          return (
            <div key={tag.id} className='tag'>
              {tag.name}
            </div>
          );
        });
      },
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
      render: (_: any) => (
        <span>{moment(_.createTime).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: 'options',
      dataIndex: 'options',
      render: (_: any) => (
        <div className='options'>
          <i className={classNames('iconfont', 'icon-edit')} title='编辑'>
            &#xe66e;
          </i>
          <div className='line'> | </div>
          <PopConfirm
            description='确定要删除吗'
            onOk={handleOk}
            onCancel={handelCancel}
          >
            <i className={classNames('iconfont', 'icon-del')} title='删除'>
              &#xe7c3;
            </i>
          </PopConfirm>
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
