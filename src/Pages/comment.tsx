import React, { FormEvent, useState } from 'react'
import { Rating } from '@material-ui/lab';
import Checkbox from '@material-ui/core/Checkbox';
import SchoolIcon from '@material-ui/icons/School';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom'

import ParameterPassedToUrl from '../Interfaces/idParameter'

import axios from '../Services/axiosConfig'
import Header from '../Components/header'
import '../Styles/pages/commentPage.css'


function CommentPage(){
    const history = useHistory()
    const [message, setMessage] = useState('')
    const [stars, setStars] = useState<null | number>(0)
    
    const id: ParameterPassedToUrl = useParams();
    
    function handleSubmit(event: FormEvent){
        event.preventDefault()
        const formData = {stars: stars, message: message}
            
        axios.post(`/resource/evaluations/${id.id}`, formData)
        .then(res =>{
            alert('Publicado com sucesso')
            history.push('/')
        })
        .catch((err)=>{
            alert('Erro ao publicar comentário')
            history.push('/')
        })
    }
    
    return(
        <div className="comment-content">
            <Header></Header>
            <main>
            <h3>Conte-nos como foi sua experiência com esse recurso:</h3>
            <form onSubmit={handleSubmit}>
                <h5> De 0 á 5, quantos chapeuzinhos esse recurso merece?</h5>
                <Rating name="rate" value={stars} onChange={(event, value)=>{setStars(value)}} icon={<SchoolIcon fontSize="large"/>}/>
                <label htmlFor="message">Comentário</label>
                <textarea id="message" required value={message} onChange={e=> setMessage(e.target.value)}/>
                <label htmlFor="warning" className="warning">Atenção!</label>
                <p>Tenho conciência que nessa comunidade não são aceitos comentários ofensivos, ameaçadores e/ou desreispeitosos. Além disso, assumo responsabilidade pelo impactos das palavras contidas no meu comentário</p>
                <Checkbox required/>
                <button type="submit">Publicar avaliação</button>
            </form>
            </main>
        </div>
    )
}

export default CommentPage;