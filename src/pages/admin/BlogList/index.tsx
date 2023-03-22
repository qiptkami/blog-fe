import React, { useEffect, useState } from 'react';
import './index.less';

const BlogList: React.FC = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = (username?: string) => {};

  return <div className='blog-list-container'></div>;
};

export default BlogList;
