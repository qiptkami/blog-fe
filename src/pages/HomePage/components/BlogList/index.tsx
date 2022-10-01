import { ClockCircleFilled, EyeFilled } from "@ant-design/icons";
import classnames from "classnames";
import { title } from "process";
import React, { useEffect, useState } from "react";
import MyPagination from "../MyPagination";
import BlogItem from "./BlogItem";
import "./index.less";

const blogList = [
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "qipt",
    createAt: "new Date()",
    views: 1,
    types: ["react", "typescript"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "qipt",
    createAt: "new Date()",
    views: 1,
    types: ["react", "typescript"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "1",
    createAt: "new",
    views: 1,
    types: ["react", "typescript"],
    img: "13",
  },
];
const BlogList: React.FC = () => {
  const [total, setTotal] = useState<number>(80); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(10); //页面大小
  useEffect(() => {
    console.log(`/blog/index/list?page=${page}&size=${size}`);
    console.log("if (res.code === 'ok' setTotal(res?.body?.total))");
  });

  const blogL = blogList.map((item) => {
    return <BlogItem blog={item}></BlogItem>;
  });

  return (
    <div className="blog-list-container">
      {blogL}
      <MyPagination total={total} page={page} size={size}></MyPagination>
    </div>
  );
};

export default BlogList;
