import React from 'react';
import {Link} from 'react-router-dom';

import '../Styles/pages/home.css'
import Header from '../Components/header'
import mainImg from '../Images/mainImage.png'

function HomePage() {
  return (
    <div className="homeContent">
      <Header></Header>
      <main id="mainContent">
        <article>
          <h1 id="title">Rea Cloud</h1>
          <p>Somos uma ferramenta para armazenamento de recursos educacionais abertos</p>
          <div className="buttons">
            <Link to="/buscar" className="button">Buscar por recurso</Link>
            <Link to="/publicar" className="button">Publicar recurso</Link>
          </div>
        </article>
        <img src={mainImg} alt="Bolhas"/>
      </main>
    </div>
  );
}

export default HomePage;
