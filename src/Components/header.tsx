import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from '../Services/axiosConfig'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsBoxArrowInRight } from 'react-icons/bs'

import '../Styles/components/header.css'

import {UserContext} from '../Context/UserContext'

function Header() {
    const {value, setValue, name, setName} = useContext(UserContext)

    async function handleLogout(){
        await axios.get('/logout').then(res=>{
            console.log(res)
            setValue(false)
            setName("")
            toast.success('Logout realizado com sucesso!')
        }).catch(err => {
            toast.error('Erro ao realizar Logout, atualize a página')
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
                <header>
                    <Link to="" className="logo"></Link>
                    <div>
                        <Link to="/perfil" className="login">Olá {name}</Link>
                        <p className="logout" onClick={handleLogout}>
                            <BsBoxArrowInRight/>
                        </p>
                    </div>
                </header>
          </>
        )
    }
};

export default Header;