import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';

import SucessModal from './sucessModal';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from '../Services/axiosConfig'

interface ResourceItemProps{
    title: string,
    last_modification: string,
    id: number,
    changed: (value: boolean)=>void
}

const useStyles = makeStyles({
    root: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        margin: 10,
        minHeight: 100,
        cursor: 'pointer'
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        textAlign: 'center',
        fontFamily: 'sans-serif',
        marginBottom: 10,
        color: "#7d7d7d"
    },
    subtitle: {
      fontSize: 14,
      fontFamily: 'Roboto, sans-serif',
      color: "#7d7d7d",
      opacity: 0.8
    }
  });   

const ResourceItem: React.FunctionComponent< ResourceItemProps > = ({title,last_modification,id,changed}) => {
    const history = useHistory()
    const classes = useStyles()

    const [isModalOpen, setIsModalOpen] = useState(false)

    function closeModal(){
        changed(true)
    }


    function handleClickResource(){
        history.push(`/recurso/${id}`)
    }

    function handleEdit(){
        history.push(`/recurso/editar/${id}`)
    }

    async function handleDelete(){
        var value = window.confirm("Se quer deletar esse recurso aperte em confirmar");
        if (value)
        {
            await axios.delete(`/resource/${id}`)
            .then(res =>{
                setIsModalOpen(true)
            })
            .catch((err)=>{
                alert("Erro ao deletar recurso")
            })
        }
    }

    return(
        <>
            {isModalOpen ? <SucessModal action="deletar recurso" closeModal={closeModal}></SucessModal> : null}
            <Card className={classes.root}>
                <CardContent onClick={handleClickResource}>
                    <Typography className={classes.title}>{ title }</Typography>
                    <Typography className={classes.subtitle}>Última modificação: { last_modification }</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="secondary" onClick={handleDelete}>Excluir</Button>
                    <Button size="small" onClick={handleEdit}>Editar</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ResourceItem;