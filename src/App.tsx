import React from 'react';
import TopBar from './layouts/components/topbar';
import FooterBar from './layouts/components/footerbar';
import './App.less'
function App() {
  return (
    <div className='app-container'>
      <TopBar></TopBar>
      <FooterBar></FooterBar>
    </div>
  );
}

export default App;
