import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import FooterBar from './components/FooterBar';
import AppRouters from './router';
import { useLocation } from 'react-router-dom';
import './App.less';

const App: React.FC = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className='app-container'>
      <AppRouters></AppRouters>
    </div>
  );
};

export default App;
