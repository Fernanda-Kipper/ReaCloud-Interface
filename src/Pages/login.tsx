import React, { FormEvent, useState, useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from '../Services/axiosConfig'

import '../Styles/pages/login.css';

import LoadingBar from 'react-top-loading-bar'

import {UserContext} from '../AuthContext/UserContext';


function LoginPage() {
  const history = useHistory()
  const [progress, setProgress] = useState(0)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setValue, setName} = useContext(UserContext)

  async function handleLogin(event: FormEvent){
        event.preventDefault()

        setProgress(progress + 50)

        const Formdata = {email: email, password: password}

        await axios.post('/login', Formdata)
        .then(res => {
          setValue(true)
          setName(res.data.name)
          setProgress(100)
        })
        .catch((err)=>{
          setValue(false)
          alert('Usuário ou senha inválidos')
      })
      setTimeout(()=>{
        history.push('/')
      }, 400)
  }
  
  return (
    <div className="login-content">
      <LoadingBar
        color='#277496'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}></LoadingBar>
      <main className="login-field">
            <h1>Realize o Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" required value={email} onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Entrar</button>
            </form>
            <div className="signin">
                  <h5>Ou cadastre-se clicando <Link to="/cadastrar">aqui</Link></h5>
            </div>
      </main>
    </div>
  );
}

export default LoginPage;
