import React, { useEffect, useState } from 'react';
import { getRankingInfo } from '../../../../services/homePage';
import { Type } from '../../../../typings/index';
import { parseType } from '../../../../utils/JsonParser';
import { useNavigate } from 'react-router-dom';
import './index.less';

const BlogRanking: React.FC = () => {
  const navigate = useNavigate();
  const [rankingData, setRankingData] = useState<any>({});

  const handleClick = (id: number) => {
    navigate(`/types`);
  };
  useEffect(() => {
    getRanking();
  }, []);

  const getRanking = () => {
    getRankingInfo().then((res) => {
      if (res?.data?.status) {
        setRankingData(res?.data?.data);
      }
    });
  };

  const ranking =
    JSON.stringify(rankingData) === '{}'
      ? null
      : Object.keys(rankingData).map((key) => {
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
    <>
      {ranking ? (
        <div className='blog-ranking'>
          <div className='blog-ranking-header'>分类</div>
          <div className='blog-ranking-body'>
            <div className='blog-ranking-item'>
              <div>{ranking}</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BlogRanking;
