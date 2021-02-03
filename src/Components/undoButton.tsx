import React  from 'react';
import {useHistory, useParams } from 'react-router-dom'

import axios from '../Services/axiosConfig'
import ParameterPassedToUrl from '../Interfaces/idParameter';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Replay from '@material-ui/icons/Replay'

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
            alert('Modificações desfeitas com sucesso!')
            history.push('')
        }).catch(err => {
            alert('Esse recurso não possui alterações para desfazer')
            history.push('')
        })
    }

    return(
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
    )
}

export default UndoButton