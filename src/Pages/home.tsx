import React from 'react';
import {Link} from 'react-router-dom';

import '../Styles/pages/home.css'
import Header from '../Components/header'

function HomePage() {
  return (
    <div className="home-content">
      <Header></Header>
      <main>
          <h1>Bem vindo ao repositório Rea Cloud</h1>
          <p>Somos uma ferramenta de armazenamento de recursos educacionais que visa o livre acesso ao conhecimento. Faça updload de recursos ou busque de acordo com sua preferência - realize leitura, adição de feedbacks ou alterações.</p>
          <div className="buttons">
            <Link to="" className="button">Buscar por recurso</Link>
            <Link to="/publicarRecurso" className="button">Publicar recurso</Link>
          </div>
      </main>
    </div>
  );
}

export default HomePage;
