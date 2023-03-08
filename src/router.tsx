import React from 'react';
import { useRoutes } from 'react-router-dom';
import TagPage from './pages/TagPage';
import HomePage from './pages/HomePage';
import BlogDetail from './pages/BlogDetail';
import LoginPage from './pages/admin/LoginPage';
import MainLayout from './pages/MainLayout';
import AdminLayout from './pages/admin/AdminLayout';

const AppRouters: React.FC = () => {
  const routes = [
    {
      path: '/',
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },
    {
      path: 'blog/:id',
      element: (
        <MainLayout>
          <BlogDetail />
        </MainLayout>
      ),
    },
    {
      path: 'tags',
      element: (
        <MainLayout>
          <TagPage />
        </MainLayout>
      ),
    },
  ];
  const adminRoutes = [
    {
      path: '/admin',
      children: [
        {
          path: '',
          element: <LoginPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
      ],
    },
  ];

  return useRoutes([...routes, ...adminRoutes]);
};
export default AppRouters;
