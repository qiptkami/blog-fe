import React from 'react';
import BlogList from './components/BlogList';
import BlogRanking from './components/BlogRanking';
import UserInfo from './components/UserInfo';
import './index.less';

const HomePage: React.FC = () => {
  return (
    <div className='home-page-container'>
      <div className='home-page-blog'>
        <BlogList />
      </div>
      <div className='home-page-info'>
        <UserInfo></UserInfo>
        <BlogRanking></BlogRanking>
      </div>
    </div>
  );
};

export default HomePage;
