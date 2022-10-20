import React from "react";
import { useRoutes } from "react-router-dom";
import TypePage from "./pages/TypePage";
import HomePage from "./pages/HomePage";

const AppRouters: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/types",
      element: <TypePage />,
    },
    {
      path: "/types/:id",
      element: <TypePage />,
    },
  ]);
  return routes;
};
export default AppRouters;
