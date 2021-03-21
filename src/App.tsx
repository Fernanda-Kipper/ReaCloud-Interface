import React from 'react';
import { ToastContainer } from 'react-toastify'

import Routes from './Routes/routes'
import './Styles/global.css'

function App() {
  return (
    <>
      <Routes/>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={true}
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
