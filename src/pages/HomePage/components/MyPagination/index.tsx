import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./index.less";

interface Props {
  total: number; //数据总量
  page: number; //当前页数
  size: number; //页面大小
}

const MyPagination: React.FC<Props> = ({ total, page, size }) => {
  const [pageNum, setPageNum] = useState<number>(1); //总页数
  useEffect(() => {
    setPageNum(Math.ceil(total / size));
  }, [total, page, size]);
  const prePage = () => {
    console.log("pre");
  };
  const nextPage = () => {
    console.log("next");
  };
  const liList = () => {
    if (pageNum) {
      for (let i = 1; i <= pageNum; i++) {
        <li key={i} className="pagination-li">
          i
        </li>;
      }
    }
  };
  return (
    <div className="pagination-container">
      <LeftOutlined
        style={{ fontSize: "12px", fontWeight: "700" }}
        onClick={prePage}
      />
      <ul className="pagination-ul"></ul>
      <RightOutlined
        style={{ fontSize: "12px", fontWeight: "700" }}
        onClick={nextPage}
      />
    </div>
  );
};

export default MyPagination;
