import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import MyTable from '../../../components/MyTable';
import PopConfirm from '../../../components/PopConfirm';
import Button from '../../../components/Button';
import BlogModal from '../BlogModal';
import { delBlog, getBlogsList } from '../../../services/blogService';
import { getAllTag } from '../../../services/tagService';
import { Tag, Blog } from '../../../typings/index';
import './index.less';

interface IProps {}

const BlogList: React.FC<IProps> = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState<number>(0); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(5); //页面大小
  const [tagEnum, setTagEnum] = useState<any[]>([]);
  const [params, setParams] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(-1);

  const handleOk = (id: number) => {
    delBlog(id);
    setPage(1);
    getData({
      page: 1,
      size: size,
    });
  };

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
              setEditId(_.id);
              setVisible(true);
            }}
          >
            &#xe66e;
          </i>
          <div className='line'> | </div>
          <PopConfirm
            description='确定要删除吗'
            onOk={() => {
              handleOk(_.id);
            }}
          >
            <i className={classNames('iconfont', 'icon-del')} title='删除'>
              &#xe7c3;
            </i>
          </PopConfirm>
        </div>
      ),
    },
  ];

  const getData = (param: {
    page: number;
    size: number;
    title?: string;
    tagId?: number;
  }) => {
    setLoading(true);
    if (params.title) {
      param.title = params.title;
    }
    if (params.tagId) {
      param.title = params.tagId;
    }
    getBlogsList(param).then((res: any) => {
      if (res.status === 200) {
        setBlogs(res.data.value);
        setTotal(res.data.total);
        setPage(res.data.page);
        setSize(res.data.size);
      }
      setLoading(false);
    });
    getAllTag().then((res: any) => {
      if (res.status === 200) {
        setTagEnum(
          res.data.value.map((item: Tag) => {
            return { value: item.id, label: item.name };
          })
        );
      }
    });
  };

  return (
    <div className='admin-blog-container'>
      <div className='blog-table'>
        <MyTable
          total={total}
          page={page}
          size={size}
          loading={loading}
          onRequest={getData}
          dataSource={blogs}
          columns={columns}
          onSubmit={(options: any) => {
            setParams(options);
            getData({
              page: 1,
              size: size,
              title: options.title,
              tagId: options.tags,
            });
          }}
          TopRender={
            <Button
              text='添加'
              disabled={loading}
              size='default'
              onClick={() => {
                setEditId(-1);
                setVisible(true);
              }}
            />
          }
          onRow={(record: any) => {
            setEditId(record.id);
            setVisible(true);
          }}
        />
      </div>
      <BlogModal
        visible={visible}
        id={editId}
        onOk={() => {
          getData({ page, size });
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
export default BlogList;
