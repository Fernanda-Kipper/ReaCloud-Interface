import React, { FormEvent, useState, useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from '../Services/axiosConfig'
import Axios from 'axios'

import '../Styles/pages/login.css';

import UserContext from '../AuthContext/UserContext';

function LoginPage() {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setValue, setUserName} = useContext(UserContext)

  async function handleLogin(event: FormEvent){

        event.preventDefault()

        const Formdata = {email: email, password: password}

        try{
          await Axios.post('https://reacloud.herokuapp.com/login', Formdata, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }).then(res => {
            setValue(true)
            setUserName(res.data.name)
            alert('Logado com sucesso')
            history.push('/')
          })
        }catch(err){
          setValue(false)
          alert('Usuário ou senha inválidos')
        }
    
      }

  return (
    <div className="login-content">
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
                  <h5>Ou cadastre-se clicando <Link to="/signIn">aqui</Link></h5>
            </div>
      </main>
    </div>
  );
}

export default LoginPage;
