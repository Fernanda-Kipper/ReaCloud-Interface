import React, { FormEvent, useState } from 'react'
import axios from '../Services/axiosConfig'
import { useParams } from 'react-router-dom'

import { Rating } from '@material-ui/lab';
import SchoolIcon from '@material-ui/icons/School';
import { withStyles } from '@material-ui/core';
import LoadingBar from 'react-top-loading-bar';
import { toast } from 'react-toastify';

import ParameterPassedToUrl from '../Interfaces/parameter-id'

import '../Styles/components/evaluation-form.css'
import 'react-toastify/dist/ReactToastify.css';
import { DefaultButton } from './default-button';
import { Textarea } from './textarea';

interface Props{
    setShouldUpdate: (value: boolean) => void;
}

function CommentForm({ setShouldUpdate }: Props){
    const [message, setMessage] = useState('')
    const [stars, setStars] = useState<null | number>(0)
    const [progress, setProgress] = useState(0)
    
    const id: ParameterPassedToUrl = useParams();
    
    function handleSubmit(event: FormEvent){
        event.preventDefault()
        setProgress(progress + 50)
        const formData = {stars: stars, message: message}

        axios.post(`/resource/evaluations/${id.id}`, formData)
        .then(res =>{
            setProgress(100)
            setStars(0)
            setShouldUpdate(true)
            toast.success('Comentário publicado com sucesso!')
        })
        .catch((err)=>{
            toast.error('Erro ao publicar comentário, faça login novamente')
        })
    }

    const RateStyled = withStyles({
        iconFilled: {
          color: 'var(--purple-primary)'
        }
    })(Rating);

    return(
        <>
        <LoadingBar
            color='var(--purple-primary)'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}></LoadingBar>
        <form id="rating-form" onSubmit={handleSubmit}>
            <label htmlFor="rate">Sua classifição</label>
            <RateStyled name="rate" value={stars} onChange={(event, value)=>{setStars(value)}} icon={<SchoolIcon fontSize="large"/>}/>
            <Textarea label="Seu comentário (opcional)" value={message} handleChange={setMessage} name="message"/>
            <p>Seu nome e sua foto de perfil serão mostrados junto com sua avaliação</p>
            <DefaultButton label="Publicar"/>
        </form>
        </>
    )
}

export default CommentForm;