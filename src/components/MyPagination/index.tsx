import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './index.less';

interface Param {
  page: number;
  size: number;
}

interface Props {
  total: number; //数据总量
  page: number; //当前页数
  size: number; //页面大小
  getData: (param: Param) => void;
}

const MyPagination: React.FC<Props> = ({ total, page, size, getData }) => {
  const [pageNum, setPageNum] = useState<number>(1); //总页数
  const [pageList, setPageList] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    setPageNum(Math.ceil(total / size));
    numList();
  }, [total, page, size, pageNum, currentPage]);
  const handleChange = (i: number) => {
    getData({ page: i, size: size });
    setCurrentPage(i);
  };

  const prePage = () => {
    if (currentPage <= 1) return;
    getData({ page: currentPage - 1, size: size });
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage >= pageNum) return;
    getData({ page: currentPage + 1, size: size });
    setCurrentPage(currentPage + 1);
  };
  const numList = () => {
    const list = [];
    for (let i = 1; i <= pageNum; i++) {
      list.push(
        <li
          key={i}
          className={
            currentPage === i
              ? classNames('pagination-li', 'pagination-li-active')
              : 'pagination-li'
          }
          onClick={() => handleChange(i)}
        >
          {i}
        </li>
      );
    }
    setPageList(list);
  };
  return (
    <>
      {pageNum === 1 ? (
        <div className='pagination-only-msg'>我也是有底线的...</div>
      ) : (
        <div className={total ? 'pagination-container' : 'pagination-hidden'}>
          <LeftOutlined
            className={currentPage === 1 ? 'pagination-disabled' : ''}
            style={{ fontSize: '12px', fontWeight: '700' }}
            onClick={prePage}
          />
          <ul className='pagination-ul'>{pageList}</ul>
          <RightOutlined
            className={currentPage === pageNum ? 'pagination-disabled' : ''}
            style={{ fontSize: '12px', fontWeight: '700' }}
            onClick={nextPage}
          />
        </div>
      )}
    </>
  );
};

export default MyPagination;
