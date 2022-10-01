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
  const [pageList, setPageList] = useState<any>();
  useEffect(() => {
    setPageNum(Math.ceil(total / size));
    numList();
  }, [total, page, size, pageNum]);
  const handleChange = (i: number) => {
    console.log("当前页：", i);
  };

  const prePage = () => {
    console.log("pre");
  };
  const nextPage = () => {
    console.log("next");
  };
  const numList = () => {
    const list = [];
    for (let i = 1; i <= pageNum; i++) {
      list.push(
        <li
          key={i}
          className={page === i ? "pagination-li" : "pagination-li"}
          onClick={handleChange(i)}
        >
          {i}
        </li>
      );
    }
    setPageList(list);
  };
  return (
    <div className="pagination-container">
      <LeftOutlined
        style={{ fontSize: "12px", fontWeight: "700" }}
        onClick={prePage}
      />
      <ul className="pagination-ul">{pageList}</ul>
      <RightOutlined
        style={{ fontSize: "12px", fontWeight: "700" }}
        onClick={nextPage}
      />
    </div>
  );
};

export default MyPagination;
