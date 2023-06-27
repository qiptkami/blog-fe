import React, { memo, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.less';

interface Param {
  page: number;
  size: number;
}

interface Props {
  total: number; //数据总量
  page: number; //当前页数
  size: number; //页面大小
  onRequest: (param: Param) => void;
  singleMsg?: string;
}

const MyPagination: React.FC<Props> = memo(
  ({ total, page = 1, size = 5, onRequest, singleMsg = '我也是有底线的...' }) => {
    const [pageNum, setPageNum] = useState<number>(1); //总页数
    const [pageList, setPageList] = useState<any>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    useEffect(() => {
      setPageNum(Math.ceil(total / size));
    }, [total, size]);

    useEffect(() => {
      onRequest({ page: page, size: size });
    }, []);

    const handleChange = useCallback(
      (i: number) => {
        onRequest({ page: i, size: size });
        setCurrentPage(i);
      },
      [size, onRequest]
    );

    const prePage = () => {
      if (currentPage <= 1) return;
      onRequest({ page: currentPage - 1, size: size });
      setCurrentPage(currentPage - 1);
    };
    const nextPage = () => {
      if (currentPage >= pageNum) return;
      onRequest({ page: currentPage + 1, size: size });
      setCurrentPage(currentPage + 1);
    };

    const numList = useCallback(() => {
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
    }, [pageNum, currentPage, handleChange]);

    useEffect(() => {
      numList();
    }, [numList]);

    return (
      <>
        {pageNum === 1 ? (
          singleMsg && <div className='pagination-only-msg'>{singleMsg}</div>
        ) : (
          <div className={total ? 'pagination-container' : 'pagination-hidden'}>
            <i
              className={classNames(
                currentPage === 1 ? 'pagination-disabled' : '',
                'iconfont',
                'icon-left'
              )}
              onClick={prePage}
            >
              &#xe7ec;
            </i>
            <ul className='pagination-ul'>{pageList}</ul>
            <i
              className={classNames(
                currentPage === pageNum ? 'pagination-disabled' : '',
                'iconfont',
                'icon-left'
              )}
              onClick={nextPage}
            >
              &#xe7eb;
            </i>
          </div>
        )}
      </>
    );
  }
);

export default MyPagination;
