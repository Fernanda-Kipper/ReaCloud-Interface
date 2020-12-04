import React, { useEffect, useState } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import axios from 'axios'

import '../Styles/pages/resource.css'
import Header from '../Components/header'

import Resource from '../Interfaces/resource'


interface ParameterPassedToUrl{
    id: string;
}

interface Licence{
    title: string,
    image: string,
    message: string
}


function ResourcePage() {
    const id: ParameterPassedToUrl = useParams();
    const [resource, setResource]= useState<Resource>()
    const [licence, setLicence] = useState<Licence>()

    useEffect(()=>{
        try{
            axios.get(`https://reacloud.herokuapp.com/resource/${id.id}`,{
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true
              }).then(response =>{
                setResource(response.data)
                setLicence(JSON.parse(response.data.licence))
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
                    <h4 className="subtitle">Licença:</h4>
                    <p className="text">{licence?.title}</p>
                    <h4 className="subtitle">Mais detalhes</h4>
                    <a className="text" href="/tabela">Ver tabela</a>
                </section>
                <section className="box">
                    <img src={resource?.image.url} alt=""/>
                    <div className="related">
                        <h4>Remixagens:</h4>
                        <Link to="#">Mathlab para crianças com défict de atenção</Link>
                    </div>
                </section>
            </div>
        </main>
    </div>
  )}

export default withRouter(ResourcePage);
