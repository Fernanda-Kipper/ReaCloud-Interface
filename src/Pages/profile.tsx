import React, { FormEvent, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from '../Services/axiosConfig';
import LoadingBar from 'react-top-loading-bar';
import Avatar from 'react-avatar';

import '../Styles/pages/profile.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Components/header';
import { TextInput } from '../Components/form/text-input';
import { Select } from '../Components/form/select';
import { SaveButton } from '../Components/save-button';

import { UserContext } from '../Context/UserContext'
import profileOptions from '../Constants/profile-options';


function ProfilePage() {
    const [progress, setProgress] = useState(0)

    const [nameComplete, setUserName] = useState("Nome completo")
    const [picture_url, setPicture] = useState("")
    const [profile, setProfile] = useState("")
    const [email, setEmail] = useState("")

    const {name,setName} = useContext(UserContext)

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

    useEffect(()=>{
        setProgress(previous => previous + 50)
        try{
            axios.get('/profile')
              .then(response =>{
                setProgress(100)
                setUserName(response.data[0].name)
                setEmail(response.data[0].email)
                setProfile(response.data[0].profile)
                setPicture(response.data[0].picture_url)
            })
        }catch(err){
            toast.error("Erro ao validar o perfil, faça o login novamente")
        }
    }, [name])

    return (
        <div className="profile-content">
            <LoadingBar
                color='var(--purple-primary)'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}></LoadingBar>
            <Header></Header>
            <main>
                <form onSubmit={handleSubmit}>
                    {picture_url 
                        ? <img src={picture_url} alt="Sua foto de perfil"/>
                        : <Avatar name={nameComplete} size="100%" style={{width: '300px', height: '150px'}}/>
                    }
                    <TextInput value={picture_url} handleChange={setPicture} label="Link para sua foto" name="image"/>
                    <TextInput value={email} isRequired label="Seu e-mail" name="email" isDisabled/>
                    <TextInput value={nameComplete} isRequired label="Nome completo" name="name" handleChange={setName}/>
                    <Select value={profile} handleChange={setProfile} isRequired label="Perfil acadêmico" name="academic-profile" options={profileOptions}/>
                    <SaveButton label="Salvar"/>
                </form>
            </main>
        </div>
    );
}

export default ProfilePage;
