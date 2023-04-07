import React, { useEffect } from 'react';
import { useHistory} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import { FormatDate } from '../Utils/format-date';
import { useResourceDelete } from '../hooks/useResourceDelete';

interface ResourceItemProps{
    title: string,
    last_modification: string,
    id: string
}

const useStyles = makeStyles({
    root: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        margin: 10,
        minHeight: 100,
        cursor: 'pointer',
        width: 300,
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        textAlign: 'center',
        fontFamily: 'sans-serif',
        marginBottom: 10,
        color: "var(--gray-strong)"
    },
    subtitle: {
      fontSize: 14,
      fontFamily: 'Roboto, sans-serif',
      color: "var(--gray-strong)",
      opacity: 0.8
    }
  });   

const ResourceItem: React.FunctionComponent< ResourceItemProps > = ({title,last_modification,id}) => {
    const history = useHistory()
    const classes = useStyles()
    const { deleteResource, isSuccess, isError } = useResourceDelete();

    function handleClickResource(){
        history.push(`/recurso/${id}`)
    }

    function handleEdit(){
        history.push(`/recurso/editar/${id}`)
    }

    async function handleDelete(){
        var value = window.confirm("Se quer deletar esse recurso aperte em confirmar");
        if (value) deleteResource(id)
    }

    useEffect(() => {
        if(!isError) return
        toast.error("Erro ao deletar recurso. Tente realizar login novamente")
    }, [isError])

    useEffect(() => {
        if(!isSuccess) return
        toast.success('Recurso deletado com sucesso!')
        history.push('/')
    }, [isSuccess])

    return(
        <>
            <Card className={classes.root}>
                <CardContent onClick={handleClickResource}>
                    <Typography className={classes.title}>{ title }</Typography>
                    <Typography className={classes.subtitle}>Última modificação: { FormatDate(last_modification) }</Typography>
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