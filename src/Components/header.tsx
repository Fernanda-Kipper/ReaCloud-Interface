import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from '../Services/axiosConfig'

import '../Styles/components/header.css'

import UserContext from '../AuthContext/UserContext'


function Header() {
    const {value, setValue, name, setUserName} = useContext(UserContext)

    const history = useHistory()

    async function handleLogout(){
        await axios.get('/logout').then(res=>{
            setValue(false)
            setUserName('')
            alert('Logout realizado com sucesso!')
            history.push('/')
        })
    }

    if(value === false){return(
        <header>
        <Link to="" className="logo"></Link>
        <Link to="/login"className="entrar">Entrar/Cadastrar</Link>
      </header>
    )}
    else{
        return(
            <header>
            <Link to="" className="logo"></Link>
            <div>
                <Link to="/profile" className="entrar">Olá {name}</Link>
                <Link to="/" className="logout" onClick={handleLogout}>Logout</Link>
            </div>
          </header>
        )
    }
};

export default Header;