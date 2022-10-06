import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { getRankingInfo } from "../../../../services/homePage";
import "./index.less";

const BlogRanking: React.FC = () => {
  const [rankingData, setRankingData] = useState<any>({});
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
    console.log(key);
    return (
      <div key={key}>
        {key} {rankingData[key]}
      </div>
    );
  });
  return (
    <div className="blog-ranking">
      <div className="blog-ranking-header">分类</div>
      <div className="blog-ranking-body">
        <div>{ranking}</div>
        <div className="blog-ranking-item">
          <div className="blog-ranking-item-icon"></div>
          <div className="blog-ranking-item-name">React</div>
          <div className="blog-ranking-item-num">11</div>
        </div>
      </div>
    </div>
  );
};

export default BlogRanking;
