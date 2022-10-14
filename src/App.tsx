import React from "react";
import TopBar from "./pages/TopBar";
import FooterBar from "./pages/FooterBar";
import HomePage from "./pages/HomePage";
import TypePage from "./pages/TypePage";
import "./App.less";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <TopBar></TopBar>
      <div className="app-body">
        {/* <HomePage></HomePage> */}
        <TypePage></TypePage>
      </div>
      <FooterBar></FooterBar>
    </div>
  );
};

export default App;
