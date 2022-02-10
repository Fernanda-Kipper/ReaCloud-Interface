import React, { useState } from 'react';

import '../Styles/pages/login.css';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleLoginButton } from '../Components/google-login-button';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);

  return (
    <div className="login-content">
        <main className="login-field">
          <h1>Entre com o Google</h1>
          <GoogleLoginButton text="Accesar com o Google" isEnabled={isTermsAgreed}/>
          <div className="login-terms-agree">
            <input
              type="checkbox"
              name="use-terms"
              onChange={e => setIsTermsAgreed(e.target.checked)}
              checked={isTermsAgreed}
            />
            <label>Eu li e concordo com os <Link to="/termo">termos de uso</Link> da plataforma ReaCloud.</label>
          </div>
      </main>
    </div>
  );
}

export default LoginPage;
