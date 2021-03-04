import React, { FormEvent, useState } from 'react'
import { Rating } from '@material-ui/lab';
import SchoolIcon from '@material-ui/icons/School';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom'

import ParameterPassedToUrl from '../Interfaces/idParameter'

import axios from '../Services/axiosConfig'
import '../Styles/components/evaluationForm.css'
import { withStyles } from '@material-ui/core';


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

    const RateStyled = withStyles({
        iconFilled: {
          color: '#277496'
        }
    })(Rating);

    return(
        <form id="rating-form" onSubmit={handleSubmit}>
            <label htmlFor="rate">Sua classifição</label>
            <RateStyled name="rate" value={stars} onChange={(event, value)=>{setStars(value)}} icon={<SchoolIcon fontSize="large"/>}/>
            {stars !== 0 ? (
                <>
                <label htmlFor="message">Comentário (opcional)</label>
                <textarea id="message" value={message} onChange={e=> setMessage(e.target.value)}/>
                <p>Seu nome e sua foto de perfil serão mostrados</p>
                <button type="submit">Publicar</button>
                </>
            ) : null}
        </form>
    )
}

export default CommentPage;