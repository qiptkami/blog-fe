import React from "react";
import TopBar from "./pages/TopBar";
import FooterBar from "./pages/FooterBar";
import HomePage from "./pages/HomePage";
import TypePage from "./pages/TypePage";
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
