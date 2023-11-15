import React, { useState } from 'react';
import PopConfirm from '../../../components/PopConfirm';
import MyTable from '../../../components/MyTable';
import Button from '../../../components/Button';
import TagModal from './TagModal';
import { getTagList, delTag } from '../../../services/tagService';
import { Tag } from '../../../typings/index';

import classNames from 'classnames';

import './index.less';

interface ITag {
  id: number;
  name: string;
  bCount: number;
}

interface IProps {}

const TagList: React.FC<IProps> = () => {
  const [total, setTotal] = useState<number>(0); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(5); //页面大小
  const [tags, setTags] = useState<ITag[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [editTag, setEditTag] = useState<Tag>();

  const handleOk = (id: number) => {
    delTag(id);
    setPage(1);
    getData({ page: 1, size });
  };

  const getData = (param: { page: number; size: number }) => {
    setLoading(true);
    getTagList(param).then((res: any) => {
      if (res.status === 200) {
        setTags(res.data.value.sort((a: ITag, b: ITag) => b.bCount - a.bCount));
        setTotal(res.data.total);
      }
      setLoading(false);
    });
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: 'blog count',
      dataIndex: 'bCount',
      hideInSearch: true,
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
              setEditTag(_);
              setVisible(true);
            }}
          >
            &#xe66e;
          </i>
          <div className='line'> | </div>
          {_.bCount === 0 ? (
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
          ) : (
            <i
              className={classNames('iconfont', 'icon-del', 'icon-disabled')}
              title='已关联博客，无法删除'
            >
              &#xe7c3;
            </i>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className='admin-tag-container'>
      <div className='admin-tag-table'>
        <MyTable
          total={total}
          page={page}
          size={size}
          loading={loading}
          onRequest={getData}
          dataSource={tags}
          columns={columns}
          onSubmit={(options: any) => {
            getData({
              page: 1,
              size: size,
            });
          }}
          TopRender={
            <Button
              text='添加'
              disabled={loading}
              size='default'
              onClick={() => {
                setEditTag({ id: -1, name: '' });
                setVisible(true);
              }}
            />
          }
          onRow={(record: any) => {
            setEditTag(record);
            setVisible(true);
          }}
        />
        <TagModal
          visible={visible}
          editInfo={editTag}
          onOk={() => {
            getData({ page, size });
            setVisible(false);
          }}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
    </div>
  );
};
export default TagList;
