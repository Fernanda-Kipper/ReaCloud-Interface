import React, { FormEvent, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from '../Services/axiosConfig'

import '../Styles/pages/profile.css'
import 'react-toastify/dist/ReactToastify.css';

import ResourceItem from '../Components/resourceItem'
import LoadingBar from 'react-top-loading-bar'
import Header from '../Components/header'

import {UserContext} from '../AuthContext/UserContext'
import Resource from '../Interfaces/resource'


function ProfilePage() {
    const [progress, setProgress] = useState(0)

    const [nameComplete, setUserName] = useState("Nome completo")
    const [picture_url, setPicture] = useState("")
    const [profile, setProfile] = useState("")
    const [email, setEmail] = useState("")
    const [userResources, setUserResources] = useState([])

    const {name,setName} = useContext(UserContext)

    const [data, setData] = useState(true)
    const [resources, setResources] = useState(false)

    const [resourcesChanged, setResourcesChanged] = useState(false)

    useEffect(()=>{
        setProgress(previus => previus + 50)
        try{
            axios.get('/profile')
              .then(response =>{
                setProgress(100)
                setUserName(response.data[0].name)
                setEmail(response.data[0].email)
                setProfile(response.data[0].profile)
                setPicture(response.data[0].picture_url)
            })
            axios.get('/profile/myResources').then(response =>{
                setUserResources(response.data)
            })
        }catch(err){
            toast.error("Erro ao validar o perfil, faça o login novamente")
        }
    }, [name,resourcesChanged])

    function displayAlertEMail(){
        toast.warn("Não é possível alterar seu email!")
    }

    function handleSubmit(event: FormEvent){
        event.preventDefault()
        const data = {"name": nameComplete, "profile": profile, "picture_url": picture_url}
        setProgress(50)
        try{
            axios.put('/profile', data, {
                onUploadProgress: (event) => {
                  setProgress(event.loaded)
              }})
              .then(res=>{
                    setProgress(100)
                    setName(nameComplete)
                    toast.success("Perfil editado com sucesso!")
            }).catch(()=>{
                toast.error('Erro ao atualizar dados. Tente novamente mais tarde')
              })
        }catch(err){
            toast.error('Erro ao atualizar dados. Tente novamente mais tarde')
        }
    }

    return (
        <div className="profile-content">
            <LoadingBar
                color='#277496'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}></LoadingBar>
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
                        <input type="text" placeholder={nameComplete} value={nameComplete} onChange={e => setUserName(e.target.value)} required/>
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
                            id={item.id}
                            changed={setResourcesChanged}
                            key={item.id}>
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
