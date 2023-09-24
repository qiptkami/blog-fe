import React from 'react';
import AppRouters from './router';
import './App.less';

const App: React.FC = () => {
  return (
    <div className='app-container'>
      <AppRouters />
    </div>
  );
};

export default App;
