import React, { FormEvent, useState, useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from '../Services/axiosConfig'

import '../Styles/pages/login.css';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';
import { DefaultInput } from '../Components/default-input';
import { DefaultButton } from '../Components/default-button';


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

        await axios.post('/login', Formdata, {
          onUploadProgress: (event) => {
            setProgress(event.loaded)
        }})
        .then(res => {
          setValue(true)
          setName(res.data.name)
          setProgress(100)

          setTimeout(()=>{
            history.push('/')
          }, 800)
        })
        .catch((err)=>{
          setProgress(100)
          setValue(false)
          toast.warn('Usuário ou senha inválidos', {
            position: toast.POSITION.BOTTOM_LEFT
          })
      })
  }
  
  return (
    <div className="login-content">
      <LoadingBar
        color='var(--purple-primary)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}></LoadingBar>
      <main className="login-field">
            <h1>Realize o Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <DefaultInput value={email} handleChange={setEmail} name="email" label="E-mail"/>
                <DefaultInput value={password} handleChange={setPassword} name="password" label="Senha" type="password"/>
                <DefaultButton label="Entrar"/>
            </form>
            <div className="signin">
                  <h5>Ou cadastre-se clicando <Link to="/cadastrar">aqui</Link></h5>
            </div>
      </main>
    </div>
  );
}

export default LoginPage;
