import React from 'react';
import FooterBar from '../../../components/FooterBar';
import TopBar from '../../../components/TopBar';
import './index.less';

interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <TopBar></TopBar>
      <div className='admin-container'>{children}</div>
      <FooterBar></FooterBar>
    </>
  );
};
export default MainLayout;
