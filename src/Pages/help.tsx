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
          <h3>Passo a Passo de como salvar Recursos Educacionais na nuvem</h3>
          <ol>
              <li>
                <h6>Acesse a plataforma Google Drive</h6>
                <img src={landingImg} alt="Página inicial do drive"/>
              </li>
              <li>
                <h6>Realize o Login</h6>
                <img src={loginImg} alt="Login no drive"/>
              </li>
              <li>
                <h6>Após login, você será redirecionado para seu drive, onde deve clicar no botão 'novo'</h6>
                <img src={initialImg} alt="Painel do drive"/>
              </li>
              <li>
                <h6>Opções serão mostradas, então selecione a opção que se encaixa - seu recurso é uma pasta ou apenas um arquivo</h6>
                <img src={uploadImg} alt="Opções, upload de pasta ou arquivo"/>
              </li>
              <li>
                <h6>Uma janela para você escolher o arquivo correto no seu computador será aberta, selecione o arquivo ou pasta deseja e clique em 'abrir'</h6>
              </li>
              <li>
                <h6>Após concluído o upload do recurso, clique para visualiza-lo e abra as configurações dele - 3 pontinhos no canto direito </h6>
                <img src={viewImg} alt="Visualizando arquivo"/>
              </li>
              <li>
                <h6>Selecione a opção 'Compartilhar'</h6>
                <img src={optionsImg} alt="Selecionando a opção compartilhar"/>
              </li>
              <li>
                <h6>Certifique-se que o arquivo está disponível para qualquer pessoa que possuir o link</h6>
                <img src={shareImg} alt="Configurações de compartilhamento"/>
              </li>
              <li>
                <h6>Além disso, verifique se aqueles que possuem o link são apenas leitores, para não possam alterar seu arquivo</h6>
                <img src={finalImg} alt="Selecionando apenas leitores"/>
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
