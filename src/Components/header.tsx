import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from '../Services/axiosConfig'

import '../Styles/components/header.css'

import {UserContext} from '../AuthContext/UserContext'
import SucessModal from './sucessModal';

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
            alert('Erro ao realizar Logout')
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
                        <Link to="/" className="logout" onClick={handleLogout}>Logout</Link>
                    </div>
            </header>
          </>
        )
    }
};

export default Header;