import React from 'react';
import { useRoutes } from 'react-router-dom';
import TagPage from './pages/TagPage';
import HomePage from './pages/HomePage';
import BlogDetail from './pages/BlogDetail';
import LoginPage from './pages/admin/LoginPage';
import MainLayout from './pages/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import AdminHome from './pages/admin/HomePage';
import BlogAdmin from './pages/admin/BlogList';
import BlogEdit from './pages/admin/BlogEdit';

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
        {
          path: 'home',
          element: (
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          ),
        },
        {
          path: 'blogs',
          element: (
            <AdminLayout>
              <BlogAdmin />
            </AdminLayout>
          ),
        },
        {
          path: 'blog/:id',
          element: (
            <AdminLayout>
              <BlogEdit />
            </AdminLayout>
          ),
        },
      ],
    },
  ];

  return useRoutes([...routes, ...adminRoutes]);
};
export default AppRouters;
