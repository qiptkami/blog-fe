import classnames from "classnames";
import React, { useEffect, useState } from "react";
import "react-router";

import { getBlogsPaginationInfo } from "../../../../services/homePage";
import MyPagination from "../MyPagination";
import BlogItem from "./BlogItem";
import "./index.less";

const BlogList: React.FC = () => {
  const [total, setTotal] = useState<number>(0); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(0); //页面大小
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = (param?: { page: number; size: number }) => {
    getBlogsPaginationInfo(param).then((res) => {
      if (res?.data?.status) {
        setData(res?.data?.data?.list);
        setTotal(res?.data?.data?.total);
        setPage(res?.data?.data?.pageNum);
        setSize(res?.data?.data?.pageSize);
      }
    });
  };

  const blogs = data.map((item: any) => {
    return <BlogItem key={item.id} blog={item}></BlogItem>;
  });

  return (
    <div className="blog-list-container">
      {blogs}
      <MyPagination
        total={total}
        page={page}
        size={size}
        getData={getData}
      ></MyPagination>
    </div>
  );
};

export default BlogList;
