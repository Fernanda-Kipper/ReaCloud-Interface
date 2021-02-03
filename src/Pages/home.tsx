import React from 'react';
import {Link} from 'react-router-dom';
import { Slide, Fade } from '@material-ui/core';

import '../Styles/pages/home.css'
import Header from '../Components/header'
import booblesImg from '../Images/boobles.svg'

function HomePage() {
  return (
    <div className="home-content">
      <Header></Header>
      <Fade in={true} timeout={900}>
        <main>
          <article>
            <Slide direction="right" in={true} timeout={1000}>
              <h1>Rea Cloud</h1>
            </Slide>
            <p>Somos uma ferramenta para armazenamento de recursos educacionais abertos</p>
            <div className="buttons">
              <Link to="/buscar" className="button">Buscar por recurso</Link>
              <Link to="/publicar" className="button">Publicar recurso</Link>
            </div>
          </article>
          <img src={booblesImg} alt=""/>
        </main>
      </Fade>
    </div>
  );
}

export default HomePage;
