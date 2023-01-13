import React, { useEffect, useState } from 'react';
import { getTypes } from '../../services/typePage';
import { Type } from '../../typings/index';
import { parseType } from '../../utils/JsonParser';
import BlogList from './components/BlogList';
import BlogRanking from './components/BlogRanking';
import TypeList from '../../components/TypeList';
import UserInfo from './components/UserInfo';
import './index.less';

const HomePage: React.FC = () => {
  const [typeListData, setTypeListData] = useState<Type[]>([]);

  useEffect(() => {
    getData();
  });

  const getData = (params?: { id?: number; page: number; size: number }) => {
    getAllType();
  };

  const getAllType = () => {
    getTypes().then((res) => {
      const temp: Type[] = [];
      Object.keys(res?.data?.data).map((item: any) => {
        temp.push(parseType(item));
      });
      setTypeListData(temp);
    });
  };

  return (
    <div className='home-page-container'>
      <div className='home-page-blog'>
        <BlogList />
      </div>
      <div className='home-page-info'>
        <UserInfo></UserInfo>
        <TypeList data={typeListData}></TypeList>
        {/* <BlogRanking></BlogRanking> */}
      </div>
    </div>
  );
};

export default HomePage;
