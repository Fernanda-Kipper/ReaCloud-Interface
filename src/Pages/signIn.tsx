import React, { FormEvent, useState, useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from '../Services/axiosConfig'

import '../Styles/pages/signin.css'

import UserContext from '../AuthContext/UserContext';

function SignInPage() {

  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
  const [profile, setProfile] = useState('')

  const {setValue} = useContext(UserContext)

  async function handleLogin(event: FormEvent){
  
        event.preventDefault()
        const Formdata = {email: email, password: password, name: name, picture_url: url, profile: profile}
        try{
          await axios.post('/signin', Formdata).then(res =>{
            setValue(true)
            alert('Cadastrado com sucesso')
            history.push('/')
          })
        }catch(err){
          alert('Email já cadastrado, realize login.')
        }
        }

  return (
    <div className="signin-content">
      <main className="signin-field">
            <h1>Realize seu cadastro</h1>
            <form onSubmit={handleLogin} className="signin-form">
                <label htmlFor="name">Seu nome completo</label>
                <input type="text" id="name" required value={name} onChange={e => setName(e.target.value)}/>
                <label htmlFor="email">Seu email</label>
                <input type="text" id="email" required value={email} onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="password">Sua senha</label>
                <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)}/>
                <label htmlFor="url">URL para sua foto</label>
                <input type="url" id="url" value={url} required onChange={e => setUrl(e.target.value)}/>
                <label htmlFor="profile">Perfil acadêmico</label>
                <select id="profile" required value={profile} onChange={e => setProfile(e.target.value)}>
                  <option value="Aluno Ensino médio">Aluno Ensino médio</option>
                  <option value="Aluno Ensino fundamental">Aluno Ensino fundamental</option>
                  <option value="Aluno Graduação">Aluno Graduação</option>
                  <option value="Aluno Pós-graduação">Aluno Pós-graduação</option>
                  <option value="Professor auxiliar">Professor auxiliar</option>
                  <option value="Professor assistente">Professor assistente</option>
                  <option value="Professor adjunto">Professor adjunto</option>
                  <option value="Professor titular">Professor titular</option>
                  <option value="Reitor/Gestor">Reitor/Gestor</option>
                  <option value="Aluno e Professor">Aluno e Professor</option>
                  <option value="Outro">Outro</option>
                </select>
                <button type="submit">Cadastrar</button>
            </form>
            <div className="login">
                  <h5>Ou faça login clicando <Link to="/login">aqui</Link></h5>
            </div>
      </main>
    </div>
  );
}

export default SignInPage;
