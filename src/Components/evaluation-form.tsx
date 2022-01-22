import React, { FormEvent, useEffect, useState } from 'react'

import { Rating } from '@material-ui/lab';
import SchoolIcon from '@material-ui/icons/School';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core';
import { toast } from 'react-toastify';

import '../Styles/components/evaluation-form.css'
import 'react-toastify/dist/ReactToastify.css';

import { DefaultButton } from './default-button';
import { Modal } from './modal'
import { Textarea } from './form/textarea';
import { useEvaluationMutation } from '../hooks/useEvaluationMutation';

interface Props{
    id?: string
    isOpen: boolean
    handleClose(): void 
}

function EvaluationForm({ id, isOpen, handleClose }: Props){
    const [message, setMessage] = useState('')
    const [stars, setStars] = useState<number | null>(0)

    const successCallback = () => {
        toast.success('Avaliação publicada com sucesso!')
        handleClose()
    }

    const { postEvaluation, isError } = useEvaluationMutation(successCallback)

    const reset = () => {
        setMessage('')
        setStars(0)
    }
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if(!id || !stars) return

        const formData = { stars, message }
        postEvaluation(id, formData)
    }

    const RateStyled = withStyles({
        iconFilled: {
          color: 'var(--purple-primary)'
        }
    })(Rating);

    useEffect(() => {
        if(!isError) return
        toast.error('Erro publicar avaliação, tente novamente')
        handleClose()
    }, [handleClose, isError])

    useEffect(() => {
        if(isOpen) return 
        reset()
    }, [isOpen])

    return(
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <Fade in={isOpen}>
                <form id="rating-form" onSubmit={handleSubmit}>
                    <label htmlFor="rate">Qual sua classificação para esse material?</label>
                    <RateStyled name="rate" value={stars} onChange={(event, value)=>{setStars(value)}} icon={<SchoolIcon fontSize="large"/>}/>
                    <Textarea label="Seu comentário (opcional)" value={message} handleChange={setMessage} name="message"/>
                    <p>Seu nome e sua foto de perfil serão mostrados junto com sua avaliação</p>
                    <DefaultButton label="Publicar" isDisabled={!stars} />
                </form>
            </Fade>
        </Modal>
    )
}

export default EvaluationForm;