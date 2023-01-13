import React from 'react';
import { useRoutes } from 'react-router-dom';
import TagPage from './pages/TagPage';
import HomePage from './pages/HomePage';
import Archives from './pages/ArchivesPage';
import BlogDetail from './pages/BlogDetail';

const AppRouters: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      children: [
        { path: '', element: <HomePage /> },
        {
          path: 'blog/:id',
          element: <BlogDetail />,
        },
      ],
    },
    {
      path: 'Tags',
      element: <TagPage />,
    },
    {
      path: 'archives',
      element: <Archives />,
    },
  ]);
  return routes;
};
export default AppRouters;
