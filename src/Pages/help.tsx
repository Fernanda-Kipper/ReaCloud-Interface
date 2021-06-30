import React from 'react';

import '../Styles/pages/help.css'
import landingImg from "../Images/help/landingPage.png"
import loginImg from "../Images/help/login.png"
import initialImg from "../Images/help/initial.png"
import uploadImg from "../Images/help/upload.png"
import viewImg from "../Images/help/view.png"
import optionsImg from "../Images/help/options.png"
import shareImg from "../Images/help/shareOptions.png"
import finalImg from "../Images/help/final.png"
import Header from '../Components/header'

function HelpPage() {
  return (
    <div className="help-content">
      <Header></Header>
      <main>
          <h3>Passo a Passo de como salvar o recurso na nuvem</h3>
          <ol>
              <li>
                <h6>Acesse a plataforma Google Drive</h6>
                <img src={landingImg} alt=""/>
              </li>
              <li>
                <h6>Realize o Login</h6>
                <img src={loginImg} alt=""/>
              </li>
              <li>
                <h6>Após login, você será redirecionado para seu drive, omde deve clicar em 'novo'</h6>
                <img src={initialImg} alt=""/>
              </li>
              <li>
                <h6>Opções serão mostradas, então selecione a opção que se encaixa - pasta ou arquivo</h6>
                <img src={uploadImg} alt=""/>
              </li>
              <li>
                <h6>Após fazer o upload do recurso, clique para vizualizá-lo e abra as configurações dele</h6>
                <img src={viewImg} alt=""/>
              </li>
              <li>
                <h6>Selecione a opção 'compartilhar'</h6>
                <img src={optionsImg} alt=""/>
              </li>
              <li>
                <h6>Certifique-se que o arquivo está disponível para aqueles que possuem o link</h6>
                <img src={shareImg} alt=""/>
              </li>
              <li>
                <h6>Além disso, verifique se aqueles que possuem o link são apenas leitores, para não poderem alterar seu arquivo</h6>
                <img src={finalImg} alt=""/>
              </li>
              <li>
                <h6>Por fim, copie o link disponibilizado e forneça ele no momento de cadastro do recurso</h6>
              </li>
          </ol>
      </main>
    </div>
  );
}

export default HelpPage;
