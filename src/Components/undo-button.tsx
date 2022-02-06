import React from 'react';
import {useHistory, useParams } from 'react-router-dom'

import axios from '../Services/axios-config'
import ParameterPassedToUrl from '../Interfaces/parameter-id';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Replay from '@material-ui/icons/Replay'
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

    function handleUndo(){
        axios.get(`/resource/undo/${params.id}`).then(res => {
            toast.success('Alterações desfeitas com sucesso!')
        }).catch(err => {
            toast.warn('Esse recurso não possui alterações para desfazer :/')
            setTimeout(()=>{
                history.push('/')
            },5000)
        })

        
    }

    return(
        <>
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