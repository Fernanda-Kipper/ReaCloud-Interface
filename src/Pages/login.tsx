import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import '../Styles/pages/login.css';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import { UserContext } from '../Context/UserContext';
import { GoogleLoginButton } from '../Components/google-login-button';


function LoginPage() {
  const history = useHistory()
  const [progress, setProgress] = useState(0)

  const {setValue, setName} = useContext(UserContext)

  const handleGoogleLogin = () => {

  }

  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
  
  return (
    <div className="login-content">
      <LoadingBar
        color='var(--purple-primary)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}></LoadingBar>
        <main className="login-field">
          <h1>Entre com o Google</h1>
          <GoogleLoginButton text="Accesar com o Google" />
      </main>
    </div>
  );
}

export default LoginPage;
