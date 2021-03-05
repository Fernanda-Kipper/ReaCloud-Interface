import React, { FormEvent, useState } from 'react'
import axios from '../Services/axiosConfig'
import { useParams } from 'react-router-dom'

import { Rating } from '@material-ui/lab';
import SchoolIcon from '@material-ui/icons/School';
import { withStyles } from '@material-ui/core';
import SucessModal from './sucessModal'

import ParameterPassedToUrl from '../Interfaces/idParameter'

import '../Styles/components/evaluationForm.css'


function CommentPage(){
    const [message, setMessage] = useState('')
    const [stars, setStars] = useState<null | number>(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleModal(){
        setIsModalOpen(!isModalOpen)
    }
    
    const id: ParameterPassedToUrl = useParams();
    
    function handleSubmit(event: FormEvent){
        event.preventDefault()
        const formData = {stars: stars, message: message}

        axios.post(`/resource/evaluations/${id.id}`, formData)
        .then(res =>{
            handleModal()
            setStars(0)
        })
        .catch((err)=>{
            alert('Erro ao publicar comentário')
        })
    }

    const RateStyled = withStyles({
        iconFilled: {
          color: '#277496'
        }
    })(Rating);

    return(
        <>
        {isModalOpen ? <SucessModal closeModal={handleModal} action="publicar comentário"></SucessModal> : null}
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
        </>
    )
}

export default CommentPage;