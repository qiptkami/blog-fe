import React, { useEffect, useState } from 'react';
import { getRankingInfo } from '../../../../services/homePage';
import { Tag } from '../../../../typings/index';
import { parseTag } from '../../../../utils/JsonParser';
import { useNavigate } from 'react-router-dom';
import './index.less';

const BlogRanking: React.FC = () => {
  const navigate = useNavigate();
  const [rankingData, setRankingData] = useState<any>({});

  const handleClick = (id: number) => {
    navigate(`/tags`);
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
          const tag: Tag = parseTag(key);
          return (
            <div key={tag.id} onClick={() => handleClick(tag.id)}>
              <i className='blog-ranking-item-icon'></i>
              <span className='blog-ranking-item-name'>{tag.name}</span>
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
