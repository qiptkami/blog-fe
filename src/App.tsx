import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import FooterBar from './components/FooterBar';
import './App.less';
import AppRouters from './router';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <>
        <div className='app-container'>
          <TopBar></TopBar>
          <div className='app-body'>
            <AppRouters></AppRouters>
          </div>
          <FooterBar></FooterBar>
        </div>
    
    </>
  );
};

export default App;
