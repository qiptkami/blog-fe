import React from "react";
import TopBar from "./components/TopBar";
import FooterBar from "./components/FooterBar";
import "./App.less";
import AppRouters from "./router";

const App: React.FC = () => (
  <div className="app-container">
    <TopBar></TopBar>
    <div className="app-body">
      <AppRouters></AppRouters>
    </div>
    <FooterBar></FooterBar>
  </div>
);

export default App;
