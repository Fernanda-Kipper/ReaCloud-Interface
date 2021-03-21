import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from '../Services/axiosConfig'

import '../Styles/components/header.css'
import 'react-toastify/dist/ReactToastify.css';

import {UserContext} from '../AuthContext/UserContext'
import SucessModal from './sucessModal';
import { toast } from 'react-toastify';

function Header() {
    const {value, setValue, name, setName} = useContext(UserContext)

    const [isModalOpen, setIsModalOpen] = useState(false)

    function closeModal(){
        setIsModalOpen(false)
        setValue(false)
        setName("")
    }

    async function handleLogout(){
        await axios.get('/logout').then(res=>{
            setIsModalOpen(true)
        }).catch(err => {
            toast.error('Erro ao realizar Logout')
        })
    }

    if(value === false){return(
        <header>
        <Link to="" className="logo"></Link>
        <Link to="/entrar"className="login">Entrar/Cadastrar</Link>
      </header>
    )}
    else{
        return(
            <>
                {isModalOpen ? <SucessModal action="realizar logout" closeModal={closeModal}></SucessModal> : null}
                <header>
                    <Link to="" className="logo"></Link>
                    <div>
                        <Link to="/perfil" className="login">Olá {name}</Link>
                        <p className="logout" onClick={handleLogout}>Logout</p>
                    </div>
            </header>
          </>
        )
    }
};

export default Header;