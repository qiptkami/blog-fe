import React, { useEffect, useState } from 'react';
import './index.less';

const HomePage: React.FC = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = (username?: string) => {};

  return (
    <>
      <div className='admin-home-page'></div>
    </>
  );
};

export default HomePage;
