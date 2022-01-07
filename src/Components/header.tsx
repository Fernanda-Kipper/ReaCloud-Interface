import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsBoxArrowInRight } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

import '../Styles/components/header.css';

import { UserContext } from '../Context/UserContext';
import { useLogout } from '../hooks/useLogout';

function Header() {
    const {value, name } = useContext(UserContext);
    const { handleLogout } = useLogout();


    if(!value){
    return(
        <header>
            <Link to="">
                <p className="logo">
                    <FaGraduationCap/>
                </p>
            </Link>
            <Link to="/entrar"className="login">Entrar/Cadastrar</Link>
      </header>
    )}
    return(
        <>
            <header>
                <Link to="">
                    <p className="logo">
                        <FaGraduationCap/>
                    </p>
                </Link>
                <div className="profile-wrap">
                    <Link to="/perfil" className="profile">Olá {name}</Link>
                    <p className="logout" onClick={handleLogout}>
                        <BsBoxArrowInRight/>
                    </p>
                </div>
            </header>
        </>
    )
};

export default Header;