import React from 'react';
import Header from '../Header/index';
import Sider from '../Sider/index';
import './index.less';

interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
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
