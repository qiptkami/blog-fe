import React, { useEffect, useState } from 'react';
import Header from '../Header/index';
import Sider from '../Sider/index';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.less';

interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeUrl, setActiveUrl] = useState<string>('');

  useEffect(() => {
    const locations = location.pathname.split('/');
    setActiveUrl(locations[locations.length - 1]);
  }, [location]);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/admin/login');
    }
  });
  return (
    <div className='admin-container'>
      <Sider activeUrl={activeUrl} />
      <div className='admin-body'>
        <Header activeUrl={activeUrl} />
        <div style={{ flex: 1 }}> {children}</div>
      </div>
    </div>
  );
};
export default MainLayout;
