import React, { FormEvent, useState, useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {UserContext} from '../Context/UserContext';
import axios from '../Services/axios-config';
import profileOptions from '../Constants/profile-options';


import '../Styles/pages/signin.css'

import { TextInput } from '../Components/form/text-input';
import { DefaultButton } from '../Components/default-button';
import { Select } from '../Components/form/select';

function SignInPage() {

  const history = useHistory()
  const [progress, setProgress] = useState(0)
  const {setValue, setName} = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
  const [profile, setProfile] = useState('')

  async function handleLogin(event: FormEvent){
  
    event.preventDefault()
    setProgress(50)

    const Formdata = {email: email, password: password, name: username, picture_url: url, profile: profile}

    await axios.post('/signin', Formdata)
    .then(res =>{
      setValue(true)
      setName(res.data.name)
      setProgress(100)
      setTimeout(()=>{
        history.push('/')
      }, 1000)
    })
    .catch((err)=>{
      if(err.response.status === 400){
        toast.warn(err.response.data.error)
        setTimeout(()=>{
          history.push('/entrar')
        }, 1000)
      }
      else{
        toast.error('Erro ao realizar cadastro, tente novamente mais tarde.')
      }
    })
  }

  return (
    <div className="signin-content">
      <LoadingBar 
        color='var(--purple-primary)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}></LoadingBar>
      <main className="signin-field">
            <h1>Realize seu cadastro</h1>
            <form onSubmit={handleLogin} className="signin-form">
                <TextInput value={username} handleChange={setUsername} name="name" label="Seu nome completo"/>
                <TextInput value={email} handleChange={setEmail} name="email" label="E-mail" type="email"/>
                <TextInput value={password} handleChange={setPassword} name="password" label="Senha" type="password"/>
                <TextInput value={url} handleChange={setUrl} name="url" label="Endereço na internet que aponta para sua foto de perfil" type="url"/>
                <Select value={profile} handleChange={setProfile} isRequired label="Perfil acadêmico" name="academic-profile" options={profileOptions}/>
                <DefaultButton label="Cadastrar-me"/>
            </form>
            <div className="login">
                  <h5>Ou faça login clicando <Link to="/entrar">aqui</Link></h5>
            </div>
      </main>
    </div>
  );
}

export default SignInPage;
