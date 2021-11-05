import React from "react";
import { DefaultButton } from "../Components/default-button";
import '../Styles/pages/newsletter.css';
import mainImg from '../Images/mainImage.png';

export default function NewsletterPage(){
  return(
    <div className="newsletter-content">
      <section>
        <h1 className="title">Rea Cloud</h1>
        <p>Somos uma ferramenta de indexação de Recursos Educacionais Abertos</p>
        <form action="https://app.us20.list-manage.com/subscribe/post?u=e6ad0abbc2b6ad91ff66095aa&id=230d4e1829" method="POST" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <p>Deseja se pré cadastrar para ser notificado quando o Reacloud estiver no ar?</p>
            <DefaultButton label="Quero ser notificado"/>
        </form>
      </section>
        <img src={mainImg} alt="Imagem de acervo digital"/>
    </div>
  )
}