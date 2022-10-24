import React from "react";
import TopBar from "./pages/components/TopBar";
import FooterBar from "./pages/components/FooterBar";
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
