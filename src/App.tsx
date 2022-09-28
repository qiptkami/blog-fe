import React from "react";
import TopBar from "./pages/TopBar";
import FooterBar from "./pages/FooterBar";
import HomePage from "./pages/HomePage";
import "./App.less";
const App: React.FC = () => {
  return (
    <div className="app-container">
      <TopBar></TopBar>
      <div className="app-body">
        <HomePage></HomePage>
      </div>
      <FooterBar></FooterBar>
    </div>
  );
};

export default App;
