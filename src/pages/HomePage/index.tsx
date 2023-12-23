import React from 'react';
import BlogList from './components/BlogList';

import './index.less';

const HomePage: React.FC = () => {
  return (
    <>
      <div className='home-page-header' />
      <div className='home-page-container'>
        <div className='home-page-blog'>
          <BlogList />
        </div>
        <div className='home-page-info'>{/* <UserInfo /> */}</div>
      </div>
    </>
  );
};

export default HomePage;
