import React, { useState, useEffect } from 'react';
import InfiniteScroll from '../../../../components/InfiniteScroll';
import BlogItem from './BlogItem';

import { getBlogsList } from '../../../../services/blogService';
import { Blog } from '../../../../typings/index';

import './index.less';

const BlogList: React.FC = () => {
  const [total, setTotal] = useState<number>(0); //数据总量
  const [data, setData] = useState<Blog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    setLoading(true);
    const res = await getBlogsList({ page: page, size: 5 });
    if (res.status === 200) {
      setData([...data, ...res.data.value]);
      setPage(page + 1);
      setTotal(res.data.total);
    }
    setLoading(false);
  };

  return (
    <div className='blog-list-container'>
      <InfiniteScroll
        loading={loading}
        next={loadMoreData}
        hasMore={data.length < total}
      >
        {data.map((item: Blog) => (
          <BlogItem key={item.id} blog={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default BlogList;
