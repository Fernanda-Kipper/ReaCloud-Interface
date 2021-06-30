import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs'

import '../Styles/pages/home.css';
import Header from '../Components/header';
import mainImg from '../Images/mainImage.png';

function HomePage() {
  return (
    <div className="home-content">
      <Header></Header>
      <main id="main-content">
        <article>
          <h1 className="title">Rea Cloud</h1>
          <p>Somos uma ferramenta de indexação de Recursos Educacionais Abertos - REA´s</p>
          <div className="buttons">
            <Link to="/buscar" className="button search">
              <p>Buscar recurso</p>
              <BsSearch/>
            </Link>
            <Link to="/publicar" className="button save">
              Indexar recurso
            </Link>
          </div>
        </article>
        <img src={mainImg} alt="Imagem de acervo digital"/>
      </main>
    </div>
  );
}

export default HomePage;
