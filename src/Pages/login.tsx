import React from 'react';

import '../Styles/pages/login.css';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleLoginButton } from '../Components/google-login-button';


function LoginPage() {
  return (
    <div className="login-content">
        <main className="login-field">
          <h1>Entre com o Google</h1>
          <GoogleLoginButton text="Accesar com o Google" />
      </main>
    </div>
  );
}

export default LoginPage;
