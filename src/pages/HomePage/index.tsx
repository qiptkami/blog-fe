import React from "react";
import BlogList from "./components/BlogList";
import BlogRanking from "./components/BlogRanking";
import UserInfo from "./components/UserInfo";
import "./index.less";

const HomePage: React.FC = () => {
  return (
    <div className="home-page-container">
      <div className="home-page-blog">
        <BlogList />
      </div>
      <div className="home-page-info">
        <div className="home-page-user-info">
          <UserInfo></UserInfo>
        </div>
        <div className="home-page-ranking-info">
          <BlogRanking></BlogRanking>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
