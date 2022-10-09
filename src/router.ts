import { lazy } from "react";
const App = lazy(() => import("./App"));
const TypePage = lazy(() => import("./pages/TypePage"));

const routes = [
  {
    path: "/",
    exact: true,
    component: App,
  },
  {
    path: "/type",
    exact: true,
    component: TypePage,
  },
  //嵌套路由
  // {
  //   path: "/home",
  //   component: Page,
  //   children: [
  //     {
  //       path: "/home",
  //       exact: true,
  //       render: () => {
  //         return <Redirect to={"/home/first"} />;
  //       },
  //     },
  //     { path: "/home/first", component: Demo },
  //     { path: "/home/second", component: Page1 },
  //   ],
  // },
];
export default routes;
