import React from 'react';
import {Link} from 'react-router-dom';

import '../Styles/pages/home.css'
import Header from '../Components/header'
import booblesImg from '../Images/boobles.svg'

function HomePage() {
  return (
    <div className="home-content">
      <Header></Header>
      <main>
        <article>
          <h1>Rea Cloud</h1>
          <p>Somos uma ferramenta para armazenamento de recursos educacionais abertos</p>
          <div className="buttons">
            <Link to="" className="button">Buscar por recurso</Link>
            <Link to="/publicarRecurso" className="button">Publicar recurso</Link>
          </div>
        </article>
        <img src={booblesImg} alt=""/>
      </main>
    </div>
  );
}

export default HomePage;
