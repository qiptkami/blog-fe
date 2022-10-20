import {
  HomeOutlined,
  TagsOutlined,
  BlockOutlined,
  InfoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import React, { useState } from "react";
import "./index.less";

const TopBar: React.FC = () => {
  const navigate = useNavigate();

  const [activeUrl, setActiveUrl] = useState<string>("/");
  const [query, setQuery] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(query);
  };
  return (
    <header className="header-container">
      <div className="header-menu">
        <span className={classnames("header-menu-title", "header-menu-item")}>
          Blog
        </span>
        <div
          className={
            activeUrl === "/"
              ? classnames(
                  "header-menu-index",
                  "header-menu-item",
                  "header-active"
                )
              : classnames("header-menu-index", "header-menu-item")
          }
          onClick={() => {
            navigate("/");
            setActiveUrl("/");
          }}
        >
          <HomeOutlined />
          <span>首页</span>
        </div>
        <div
          className={
            activeUrl === "/types"
              ? classnames(
                  "header-menu-types",
                  "header-menu-item",
                  "header-active"
                )
              : classnames("header-menu-types", "header-menu-item")
          }
          onClick={() => {
            navigate("/types");
            setActiveUrl("/types");
          }}
        >
          <TagsOutlined />
          <span>分类</span>
        </div>
        <div
          className={
            activeUrl === "/archives"
              ? classnames(
                  "header-menu-archives",
                  "header-menu-item",
                  "header-active"
                )
              : classnames("header-menu-archives", "header-menu-item")
          }
          onClick={() => {
            navigate("/archives");
            setActiveUrl("/archives");
          }}
        >
          <BlockOutlined />
          <span>归档</span>
        </div>
        <div
          className={
            activeUrl === "/about"
              ? classnames(
                  "header-menu-about",
                  "header-menu-item",
                  "header-active"
                )
              : classnames("header-menu-about", "header-menu-item")
          }
          onClick={() => {
            navigate("/about");
            setActiveUrl("/about");
          }}
        >
          <InfoOutlined />
          <span>关于我</span>
        </div>
      </div>
      <form className="header-menu-search" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="header-menu-search-input"
          type="text"
          name="query"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <SearchOutlined
          className="header-menu-search-icon"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </header>
  );
};

export default TopBar;
