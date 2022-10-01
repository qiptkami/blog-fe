import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import classNames from "classnames";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    setPageNum(Math.ceil(total / size));
    numList();
  }, [total, page, size, pageNum, currentPage]);
  const handleChange = (i: number) => {
    console.log("当前页：", i);
    setCurrentPage(i);
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
          className={
            currentPage === i
              ? classNames("pagination-li", "pagination-li-active")
              : "pagination-li"
          }
          onClick={() => handleChange(i)}
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
        className={currentPage === 1 ? "pagination-disabled" : ""}
        style={{ fontSize: "12px", fontWeight: "700" }}
        onClick={prePage}
      />
      <ul className="pagination-ul">{pageList}</ul>
      <RightOutlined
        className={currentPage === pageNum ? "pagination-disabled" : ""}
        style={{ fontSize: "12px", fontWeight: "700" }}
        onClick={nextPage}
      />
    </div>
  );
};

export default MyPagination;
