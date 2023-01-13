import React, { useEffect, useState } from 'react';
import { getTags } from '../../services/tagPage';
import { Tag } from '../../typings/index';
import { parseTag } from '../../utils/JsonParser';
import BlogList from './components/BlogList';
import BlogRanking from './components/BlogRanking';
import TagList from '../../components/TagList';
import UserInfo from './components/UserInfo';
import './index.less';

const HomePage: React.FC = () => {
  const [tagListData, settagListData] = useState<Tag[]>([]);

  useEffect(() => {
    getData();
  });

  const getData = (params?: { id?: number; page: number; size: number }) => {
    getAllTag();
  };

  const getAllTag = () => {
    getTags().then((res) => {
      const temp: Tag[] = [];
      Object.keys(res?.data?.data).map((item: any) => {
        temp.push(parseTag(item));
      });
      settagListData(temp);
    });
  };

  return (
    <div className='home-page-container'>
      <div className='home-page-blog'>
        <BlogList />
      </div>
      <div className='home-page-info'>
        <UserInfo></UserInfo>
        <TagList data={tagListData}></TagList>
        {/* <BlogRanking></BlogRanking> */}
      </div>
    </div>
  );
};

export default HomePage;
