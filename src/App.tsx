import React, { useEffect, useState } from 'react';
import AppRouters from './router';
import './App.less';

const App: React.FC = () => {
  return (
    <div className='app-container'>
      <AppRouters></AppRouters>
    </div>
  );
};

export default App;
