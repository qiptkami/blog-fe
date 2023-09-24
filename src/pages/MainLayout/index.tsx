import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.less';

interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='body-container'>{children}</div>
      <Footer />
    </>
  );
};
export default MainLayout;
