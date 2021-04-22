import React, { useEffect, useState } from 'react';
import {  useParams, withRouter } from 'react-router-dom';
import LinkIcon from '@material-ui/icons/Link';
import { toast } from 'react-toastify';

import axios from '../Services/axiosConfig'

import '../Styles/pages/resource.css'
import 'react-toastify/dist/ReactToastify.css';

import warningImg from '../Images/warning.svg'

import Header from '../Components/header'
import EvaluationForm from '../Components/evaluationForm'
import Resource from '../Interfaces/resource'
import ParameterPassedToUrl from '../Interfaces/idParameter'
import CommentsList from '../Components/comments'
import StyledRate from '../Components/styledRating';


interface Licence{
    title: string,
    image: string,
    message: string
}

function ResourcePage() {
    const params: ParameterPassedToUrl = useParams();
    const [resource, setResource]= useState<Resource>()
    const [licence, setLicence] = useState<Licence>()
    const [avgStars, setAvg] = useState(0)
    const [showDetails, setShowDetails] = useState(false)
    const [shouldCommentsUpdate, setShouldCommentsUpdate] = useState(false)

    useEffect(()=>{
        axios.get(`/resource/${params.id}`)
        .then(response =>{
            setResource(response.data)
            setLicence(JSON.parse(response.data.licence))})
        .catch((e)=>{
            toast.warn('Não foi possivel carregar dados do recurso')
        })

        axios.get(`/resource/evaluations/avarage/${params.id}`)
        .then(response =>{
            setAvg(response.data.Avarage)
        })
        .catch((e)=>{
            toast.warn('Não foi possivel carregar dados do recurso')
        })

    }, [params.id])

    function handleDetails(){
        if(showDetails){
            setShowDetails(false)
        }
        else{
            setShowDetails(true)
        }
    }
    
  return (
    <div className="resource-content">
        <Header></Header>
        <main>
            <section className="resource-header">
                <div className="identity">
                    <h1 className="title">{resource?.title}</h1>
                    <h5>Autor: {resource?.author}</h5>
                    <h5>{resource?.date_of_publishment}</h5>
                </div>
                <div className="interaction">
                    <div className="stars">
                        <h5>Avaliações</h5>
                        <StyledRate value={avgStars}/>
                    </div>
                    <LinkIcon color="primary"/>
                    <a href={resource?.external_url}>Visualizar material</a>
                </div>
            </section> 
            <div className="media">
                <img src={resource?.image.url} alt=""/>
                { resource?.video_link.length ? <iframe title="video" src={resource?.video_link} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> : null}
            </div>
            <section className="data">
                <h3>Detalhes do recurso:</h3>
                <div className="data-content">
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
                    <h4 className="subtitle">Licença:</h4>
                    <p className="text">{licence?.title}</p>
                    <div className="youCan">
                        <img src={warningImg} alt="Aviso"/>
                        <h6>Você pode:</h6>
                    </div>
                    <p className="text">{licence?.message}</p>
                    <h4 className="subtitle">Compartilhado por:</h4>
                    <p className="text">{resource?.userName}</p>
                    <h4 className="subtitle"> Recurso correlato: </h4>
                    {resource?.relation ? (<a href="x" className="text" >{resource?.relation}</a>) : <p className="text">Não listado</p>}
                    <h4 className="subtitle">Ultima modificação:</h4>
                    <p className="text">{resource?.last_modification}</p>
                    <h4 className="subtitle">Mais detalhes</h4>
                    <button className="text" onClick={handleDetails}>Ver tabela</button>
                        {showDetails ? (
                            <table>
                                <thead>
                                    <tr><th> Rótulo </th><th> Dado </th></tr>
                                </thead>
                                <tbody>
                                    <tr><td> Tipo de Recurso </td><td> {resource?.type} </td></tr>
                                    <tr><td> Formato </td><td> {resource?.format} </td></tr>
                                    <tr><td> Linguagem </td><td> {resource?.language}</td></tr>
                                    <tr><td> Contruibuidores - Manutenção </td><td> {resource?.contributor} </td></tr>
                                    <tr><td> Onde foi publicado </td><td> {resource?.publisher} </td></tr>
                                    <tr><td> Pré requisitos técnicos? </td><td> {resource?.technical_requirements} </td></tr>
                                    <tr><td> Descriação pré requisitos técnicos</td><td> {resource?.description_of_technical_requirements} </td></tr>
                                </tbody>
                            </table>
                        ) : null }
                </div>
            </section>
            <section className="rate-form">
                <h3>Avaliar este recurso</h3>
            <EvaluationForm setShouldUpdate={setShouldCommentsUpdate}/>
            </section>
            <section className="rating-section">
                <h3>Avaliações</h3>
                <CommentsList shouldUpdate={shouldCommentsUpdate}/>
            </section>
        </main>
    </div>
  )}

export default withRouter(ResourcePage);
