import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import MyTable from '../../../components/MyTable';
import PopConfirm from '../../../components/Popconfirm';
import { useNavigate } from 'react-router-dom';
import { getBlogsPaginationInfo } from '../../../services/homePage';
import { getAllTag } from '../../../services/tagPage';
import { Tag, Blog } from '../../../typings/index';
import './index.less';

interface IProps {}

const BlogAdmin: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState<number>(0); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(5); //页面大小
  const [tagEnum, setTagEnum] = useState<any[]>([]);

  const handleOk = () => {};
  const handelCancel = () => {};

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: 'description',
      dataIndex: 'description',
      hideInSearch: true,
      render: (_: any) => (
        <span className='description' title={_.description}>
          {_.description}
        </span>
      ),
      width: '50%',
      ellipsis: true,
    },
    {
      title: 'tags',
      dataIndex: 'tags',
      valueType: 'select',
      valueEnum: tagEnum,
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
      hideInSearch: true,
      render: (_: any) => (
        <span>{moment(_.createTime).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: 'options',
      dataIndex: 'options',
      hideInSearch: true,
      render: (_: any) => (
        <div
          className='options'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <i
            className={classNames('iconfont', 'icon-edit')}
            title='编辑'
            onClick={() => {
              navigate(`/admin/blog/${_.id}`, { state: _.id });
            }}
          >
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
    // getAllTag().then((res: any) => {
    // setTagEnum(
    //   res?.data?.data.map((item: Tag) => {
    //     return { value: item.id, label: item.name };
    //   })
    // );
    // });
    setTagEnum([
      { value: 1, label: 'text' },
      { value: 2, label: 'abc' },
      { value: 3, label: 'cbs' },
      { value: 4, label: 'wsx' },
      { value: 5, label: 'fda' },
    ]);
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
          onRow={(record) => {
            console.log(record);
          }}
        />
      </div>
    </div>
  );
};
export default BlogAdmin;
