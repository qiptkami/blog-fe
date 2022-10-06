import axios from "axios";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { getIndexData } from "../../../../services/homePage";
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
    types: ["react"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "qipt",
    createAt: "new Date()",
    views: 1,
    types: ["typescript"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "1",
    createAt: "new",
    views: 1,
    types: ["react"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "1",
    createAt: "new",
    views: 1,
    types: ["react"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "1",
    createAt: "new",
    views: 1,
    types: ["react"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "1",
    createAt: "new",
    views: 1,
    types: ["react"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "1",
    createAt: "new",
    views: 1,
    types: ["react"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "1",
    createAt: "new",
    views: 1,
    types: ["react"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "1",
    createAt: "new",
    views: 1,
    types: ["react"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "1",
    createAt: "new",
    views: 1,
    types: ["react"],
    img: "13",
  },
  {
    title: "123",
    description: "test",
    avatar: "123",
    username: "1",
    createAt: "new",
    views: 1,
    types: ["react"],
    img: "13",
  },
];
const BlogList: React.FC = () => {
  const [total, setTotal] = useState<number>(80); //数据总量
  const [page, setPage] = useState<number>(1); //当前页数
  const [size, setSize] = useState<number>(10); //页面大小
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getIndexData().then((res) => {
      if (res?.data?.status) {
        console.log(res?.data?.msg);
        setData(res?.data?.data?.list);
      }
    });
  };

  const blogs = data.map((item: any) => {
    return <BlogItem key={item.id} blog={item}></BlogItem>;
  });

  return (
    <div className="blog-list-container">
      {blogs}
      <MyPagination total={total} page={page} size={size}></MyPagination>
    </div>
  );
};

export default BlogList;
