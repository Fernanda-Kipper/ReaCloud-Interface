import React, { FormEvent, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from '../Services/axiosConfig';
import { CgProfile } from "react-icons/cg";
import { BiExtension, BiArchive } from "react-icons/bi";
import LoadingBar from 'react-top-loading-bar';

import '../Styles/pages/profile.css';
import 'react-toastify/dist/ReactToastify.css';

import ResourceItem from '../Components/resourceItem';
import Header from '../Components/header';
import SavedUrls from '../Components/savedUrls';
import { DefaultInput } from '../Components/defaultInput';
import { Select } from '../Components/select';
import { SaveButton } from '../Components/saveButton';

import { UserContext } from '../Context/UserContext'
import Resource from '../Interfaces/resource';
import profileOptions from '../Interfaces/profileOptions';

const dashboardOptions = {
    userData : "userData",
    publishedResources: "publishedResources",
    extension: "extension"
}

function ProfilePage() {
    const [progress, setProgress] = useState(0)

    const [nameComplete, setUserName] = useState("Nome completo")
    const [picture_url, setPicture] = useState("")
    const [profile, setProfile] = useState("")
    const [email, setEmail] = useState("")
    const [userResources, setUserResources] = useState([])

    const {name,setName} = useContext(UserContext)

    const [dashboardView, setDashboardView] = useState(dashboardOptions.userData)

    const [resourcesChanged, setResourcesChanged] = useState(false)

    function handleChangeView(view: string){
        setDashboardView(view)
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
            axios.get('/profile/myResources').then(response =>{
                setUserResources(response.data)
            })
        }catch(err){
            toast.error("Erro ao validar o perfil, faça o login novamente")
        }
    }, [name,resourcesChanged])

    return (
        <div className="profile-content">
            <LoadingBar
                color='var(--purple-primary)'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}></LoadingBar>
            <Header></Header>
            <main>
                <aside>
                    <nav onClick={()=> handleChangeView(dashboardOptions.userData)}>
                        <CgProfile/>
                    </nav>
                    <nav onClick={()=> handleChangeView(dashboardOptions.publishedResources)}>
                        <BiArchive/>
                    </nav>
                    <nav onClick={()=> handleChangeView(dashboardOptions.extension)}>
                        <BiExtension/>
                    </nav>
                </aside>

                {dashboardView === dashboardOptions.userData &&
                    <form onSubmit={handleSubmit}>
                        <img src={picture_url} alt="Sua foto de perfil"/>
                        <DefaultInput value={picture_url} handleChange={setPicture} isRequired label="Link para sua foto" name="image"/>
                        <DefaultInput value={email} isRequired label="Seu e-mail" name="email" isDisabled/>
                        <DefaultInput value={nameComplete} isRequired label="Nome completo" name="name" handleChange={setName}/>
                        <Select value={profile} handleChange={setProfile} isRequired label="Perfil acadêmico" name="academic-profile" options={profileOptions}/>
                        <SaveButton label="Salvar"/>
                    </form>
                }
                { dashboardView === dashboardOptions.publishedResources &&
                <>
                    <p className="description">Aqui estão os recursos que você publicou no repositório</p>
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
                </>}
                { dashboardView === dashboardOptions.extension && <SavedUrls/> }
            </main>
        </div>
    );
}

export default ProfilePage;
