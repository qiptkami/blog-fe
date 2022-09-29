import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MyPagination from "./pages/HomePage/components/MyPagination";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <App />
  <MyPagination total={100} size={10} page={1}></MyPagination>
);
