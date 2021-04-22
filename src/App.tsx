import React from 'react';
import { ToastContainer } from 'react-toastify'

import Routes from './Routes/routes'
import './Styles/global.css'

function App() {
  return (
    <>
      <Routes/>
      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      ></ToastContainer>
    </>
  );
}

export default App;
