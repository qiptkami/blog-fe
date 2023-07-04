import React, { useEffect, useState } from 'react';
import { getAllTag } from '../../services/tagPage';
import { Tag } from '../../typings/index';
import BlogList from './components/BlogList';
import TagList from '../../components/TagList';
import UserInfo from './components/UserInfo';
import './index.less';

const HomePage: React.FC = () => {
  const [tagListData, setTagListData] = useState<Tag[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = (params?: { id?: number; page: number; size: number }) => {
    getTags();
  };

  const getTags = () => {
    getAllTag().then((res: any) => {
      if (res.status === 200) {
        setTagListData(res.data.value);
      }
    });
  };

  return (
    <>
      <div className='home-page-header'></div>
      <div className='home-page-container'>
        <div className='home-page-blog'>
          <BlogList />
        </div>
        <div className='home-page-info'>
          <UserInfo></UserInfo>
          <TagList data={tagListData}></TagList>
        </div>
      </div>
    </>
  );
};

export default HomePage;
