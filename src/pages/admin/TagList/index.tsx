import React, { useEffect, useState } from 'react';
import PopConfirm from '../../../components/Popconfirm';
import { getTagList } from '../../../services/tagService';
import { COLOR } from '../../../components/TagList/enum';
import classNames from 'classnames';

import './index.less';
import Button from '../../../components/Button';

interface ITag {
  id: number;
  name: string;
  bCount: number;
}

interface IProps {}

const TagList: React.FC<IProps> = () => {
  const [total, setTotal] = useState<number>(0); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(999); //页面大小
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    getData({ page, size });
  }, []);

  const handleOk = (id: number) => {
    setPage(1);
    setSize(5);
  };

  const handelCancel = () => {};

  const getData = (param: { page: number; size: number }) => {
    getTagList(param).then((res: any) => {
      if (res.status === 200) {
        setTags(res.data.value.sort((a: ITag, b: ITag) => b.bCount - a.bCount));
        setTotal(res.data.total);
      }
    });
  };

  const tagList = tags.map((item: ITag) => {
    const c = COLOR[Math.floor(Math.random() * COLOR.length)];
    return (
      <div
        key={item.id}
        className='admin-tag-item'
        style={{ backgroundColor: c.backgroundColor, color: c.color }}
      >
        <span className='admin-tag-item-name'>{item.name}</span>
        <span className='admin-tag-item-count'>{item.bCount}</span>
      </div>
    );
  });

  return (
    <div className='admin-tag-container'>
      <Button />
      <div className='admin-tag-title'>Tags {total}</div>
      <div className='admin-tag-list'>{tagList}</div>
    </div>
  );
};
export default TagList;
