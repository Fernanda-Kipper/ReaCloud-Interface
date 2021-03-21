import React from 'react';
import { ToastContainer } from 'react-toastify'

import Routes from './Routes/routes'
import './Styles/global.css'

function App() {
  return (
    <>
      <Routes/>
      <ToastContainer/>
    </>
  );
}

export default App;
