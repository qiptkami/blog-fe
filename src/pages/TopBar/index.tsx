import {
  HomeOutlined,
  TagsOutlined,
  BlockOutlined,
  InfoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import React, { useState } from "react";
import "./index.less";

const TopBar: React.FC = () => {
  const activeStyle = {
    textDecoration: "underline",
  };

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
        <div className={classnames("header-menu-index", "header-menu-item")}>
          <NavLink
            to="/home"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <HomeOutlined />
            <span>首页</span>
          </NavLink>
        </div>
        <div className={classnames("header-menu-types", "header-menu-item")}>
          <NavLink
            to="/types"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <TagsOutlined />
            <span>分类</span>
          </NavLink>
        </div>
        <div className={classnames("header-menu-archives", "header-menu-item")}>
          <NavLink
            to="/archives"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <BlockOutlined />
            <span>归档</span>
          </NavLink>
        </div>
        <div className={classnames("header-menu-about", "header-menu-item")}>
          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <InfoOutlined />
            <span>关于我</span>
          </NavLink>
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
