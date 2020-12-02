import React, { FormEvent, useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';

import '../Styles/pages/profile.css';

import Header from '../Components/header';
import UserContext from '../AuthContext/UserContext';

import Resource from '../Interfaces/resource'
import ResourceItem from '../Components/resourceItem';

function ProfilePage() {
    const history = useHistory()
    const [name, setName] = useState("Nome completo")
    const [picture_url, setPicture] = useState("")
    const [profile, setProfile] = useState("")
    const [email, setEmail] = useState("")
    const [userResources, setUserResources] = useState([])

    const {setUserName} = useContext(UserContext)

    const [data, setData] = useState(true)
    const [resources, setResources] = useState(false)


    useEffect(()=>{
        try{
            Axios.get('/profile').then(response =>{
                setName(response.data[0].name)
                setEmail(response.data[0].email)
                setProfile(response.data[0].profile)
                setPicture(response.data[0].picture_url)
            })
            Axios.get('/myResources').then(response =>{
                setUserResources(response.data)
            })
        }catch(err){
            console.log("Erro ao validar perfil")
            history.push("/")
        }
    }, [])

    function displayAlertEMail(){
        alert("Não é possível alterar seu email!")
    }

    function handleSubmit(event: FormEvent){
        event.preventDefault()
        const data = {"name": name, "profile": profile, "picture_url": picture_url}

        try{
            Axios.put('/updateProfile', data).then(res=>{
                setUserName(name)
                alert('Alterado com sucesso!')
                history.push('/')
            }).catch(()=>{
                alert('Erro ao atualizar dados')
                history.push('/')
              })
        }catch(err){
            alert('Erro ao atualizar dados')
            history.push('/')
        }
    }

    return (
        <div className="profile-content">
            <Header></Header>
            <main>
                <aside>
                    <nav onClick={
                        ()=>{
                        setData(true)
                        setResources(false)
                        }}>Meus Dados</nav>
                    <nav onClick={
                        ()=>{
                        setData(false)
                        setResources(true)
                        }}>Meus Recursos</nav>
                </aside>
                {data ? 
                    <form onSubmit={handleSubmit}>
                        <img src={picture_url} alt="Sua foto de perfil"/>
                        <label htmlFor="image">Link para sua foto</label>
                        <input className="url" type="text" placeholder={picture_url} value={picture_url} onChange={e => setPicture(e.target.value)} required/>
                        <div className="email" onClick={displayAlertEMail}>{email}</div>
                        <label htmlFor="name">Seu nome completo</label>
                        <input type="text" placeholder={name} value={name} onChange={e => setName(e.target.value)} required/>
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
                        <button type="submit">Alterar meus dados</button>
                    </form>
                : null}
                { resources ?
                <ul className="Recursos">
                    {userResources.map((item: Resource)=>{
                        return(
                            <ResourceItem 
                            title={item.title} 
                            last_modification={item.last_modification} 
                            id={item.id}>
                            </ResourceItem>
                        )
                    })}
                </ul>
                : null}
            </main>
        </div>
    );
    }

export default ProfilePage;
