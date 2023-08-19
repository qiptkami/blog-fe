import React, { useEffect } from 'react';
import Header from '../Header/index';
import Sider from '../Sider/index';
import { useNavigate } from 'react-router-dom';
import './index.less';

interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/admin/login');
    }
  });
  return (
    <div className='admin-container'>
      <Sider></Sider>
      <div className='admin-body'>
        <Header />
        <div style={{ flex: 1 }}> {children}</div>
      </div>
    </div>
  );
};
export default MainLayout;
