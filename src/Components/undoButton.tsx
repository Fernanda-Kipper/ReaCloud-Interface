import React, { useState }  from 'react';
import {useHistory, useParams } from 'react-router-dom'

import axios from '../Services/axiosConfig'
import ParameterPassedToUrl from '../Interfaces/idParameter';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Replay from '@material-ui/icons/Replay'
import SucessModal from './sucessModal';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(3),
    },
}));

function UndoButton(){
    const params: ParameterPassedToUrl = useParams();
    const history = useHistory()
    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleModal(){
        setIsModalOpen(false)
        history.push('/')
    }

    function handleUndo(){
        axios.get(`/resource/undo/${params.id}`).then(res => {
            setIsModalOpen(true)
        }).catch(err => {
            toast.warn('Esse recurso não possui alterações para desfazer :/')
            setTimeout(()=>{
                history.push('/')
            },5000)
        })

        
    }

    return(
        <>
            {isModalOpen
                ? <SucessModal action="modificações desfeitas" closeModal={handleModal}/>
                : null
            }
            <Button
                variant="outlined"
                color="secondary"
                size="medium"
                className={classes.button}
                startIcon={<Replay />}
                onClick={handleUndo}
                >
                Desfazer
            </Button>
        </>
    )
}

export default UndoButton