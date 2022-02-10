import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

import '../Styles/components/header.css';

import { UserContext } from '../Context/UserContext';
import { useLogout } from '../hooks/useLogout';
import When from './when';

function Header() {
    const { isLogged, name } = useContext(UserContext);
    const { handleLogout } = useLogout();
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const handleToggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen)
    }

    if(!isLogged){
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
                <p className='profile' onClick={handleToggleOptions}>
                    Olá, {name}
                    <BsChevronDoubleDown />
                </p>
                <When expr={isOptionsOpen}>
                    <div className='options-wrapper'>
                        <Link to="/perfil">Meu perfil</Link>
                        <Link to="/meus-recursos">Meus recursos</Link>
                        <Link to="/plugin">Plugin</Link>
                        <p onClick={handleLogout}>Sair</p>
                    </div>
                </When>
            </header>
        </>
    )
};

export default Header;