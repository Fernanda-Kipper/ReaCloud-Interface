import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import axios from 'axios'

import '../Styles/pages/resource.css'
import Header from '../Components/header'

import Resource from '../Interfaces/resource'
import { CCBYSA } from '../Interfaces/licences';
import ccimage from '../Images/ccbysa.png'

interface ParameterPassedToUrl{
    id: string;
}


function ResourcePage() {
    const id: ParameterPassedToUrl = useParams();
    const [resource, setResource]= useState<Resource>()

    const [about, setAbout] = useState(true)
    const [reviews, setReviews] = useState(false)
    const [forks, setForks] = useState(false)

    useEffect(()=>{
        try{
            axios.get(`/resource/${id.id}`).then(response =>{
                setResource(response.data[0][0])
            })
        }catch(err){
            console.log("Erro ao carregar dados do recurso")
        }
    })
    
  return (
    <div className="resource-content">
        <Header></Header>
        <main>
            <section className="resource-header">
                <div className="identity">
                    <h1 className="title">{resource?.title}</h1>
                    <h5>{resource?.author}</h5>
                    <h5>{resource?.date_of_publishment}</h5>
                </div>
                <button>Visualizar material</button>
            </section>
            <nav>
                <h5 className={`${about}`} onClick={()=>{
                setAbout(true)
                setForks(false)
                setReviews(false)}}>
                    Sobre
                </h5>
                <h5 className={`${reviews}`} onClick={()=>{
                setAbout(false)
                setForks(false)
                setReviews(true)}}>
                    Avaliações
                </h5>
                <h5 className={`${forks}`} onClick={()=>{
                setAbout(false)
                setForks(true)
                setReviews(false)}}>
                    Alterações
                </h5>
            </nav>
            {about ?             
            <div className="main-content">
                <section className="data">
                    <h4 className="subtitle">Descrição Sumária:</h4>
                    <p className="text">
                        {resource?.description}
                    </p>
                    <h4 className="subtitle">Público alvo:</h4>
                    <p className="text">{resource?.audience}</p>
                    <h4 className="subtitle">Área do conhecimento:</h4>
                    <p className="text">{resource?.subject}</p>
                    <h4 className="subtitle">Palavras-chave:</h4>
                    <p className="text">{resource?.keywords}</p>
                    <h4 className="subtitle">Metadados</h4>
                    <a className="text" href="/tabela">Ver tabela</a>
                </section>
                <section className="box">
                    <div className="licence">
                        <img src={ccimage} alt=""/>
                        <h6>{CCBYSA.title}</h6>
                        <h4>Você Pode:</h4>
                        <p>{CCBYSA.message}</p>
                    </div>
                </section>
            </div> : null}
        </main>
    </div>
  )}

export default withRouter(ResourcePage);
