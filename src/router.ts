// import { RouteConfig } from "react-router-config";
import TypePage from "./pages/TypePage";
import App from "./App";

const routes = [
  {
    path: "/",
    component: App,
    routes: [
      {
        path: "/types",
        component: TypePage,
      },
    ],
  },
];
export default routes;
