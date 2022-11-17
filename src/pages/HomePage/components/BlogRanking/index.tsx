import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getRankingInfo } from '../../../../services/homePage';
import { Type } from '../../../../typings/index';
import { parseType } from '../../../../utils/JsonParser';
import './index.less';

const BlogRanking: React.FC = () => {
  const [rankingData, setRankingData] = useState<any>({});
  const handleClick = (id: number) => {
    console.log(id);
  };
  useEffect(() => {
    getRanking();
  }, []);

  const getRanking = () => {
    getRankingInfo().then((res) => {
      if (res?.data?.status) {
        console.log(res?.data?.msg);
        setRankingData(res?.data?.data);
      }
    });
  };

  const ranking = Object.keys(rankingData).map((key) => {
    const type: Type = parseType(key);
    return (
      <div key={type.id} onClick={() => handleClick(type.id)}>
        <i className='blog-ranking-item-icon'></i>
        <span className='blog-ranking-item-name'>{type.name}</span>
        <span className='blog-ranking-item-num'> {rankingData[key]}</span>
      </div>
    );
  });
  return (
    <div className='blog-ranking'>
      <div className='blog-ranking-header'>分类</div>
      <div className='blog-ranking-body'>
        <div className='blog-ranking-item'>
          <div>{ranking}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogRanking;
