import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import '../Styles/components/savedUrls.css'
import { useExtension } from '../Services/hooks/useExtension';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#FFF',
        margin: 10,
        minHeight: 80,
        cursor: 'pointer',
        width: 300,
        borderRadius: 10,
        padding: 1,
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
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%'
    }
  });

export default function SavedUrls(){
    const { data, error, handleDelete } = useExtension()
    const classes = useStyles()

    function redirectToDownload(){
        window.location.href = "https://chrome.google.com/webstore/category/extensions?hl=pt-BR"
    }

    useEffect(()=>{
        if(error.state){
            error.redirectOnClick ? toast.warn(error.message, {onClick: redirectToDownload})
            : toast.error(error.message)
        }
    },[error])

    if(!data.length){
        return(
            <div className="container">
                <p className="description">
                    Você não possui nenhum material salvo na extensão do Rea Cloud :/
                </p>
            </div>
        )
    }

    return(
       <div className="container">
           <p className="description">Aqui estão os materiais que você salvou através da extensão do ReaCloud</p>
           {data.map((element) => 
            <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    {element.title? element.title : element.link.replace('https://', '')}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button size="small" color="default">Publicar</Button>
                <Button size="small" color="secondary" onClick={() => {handleDelete(element.link)}}>Excluir</Button>
            </CardActions>
        </Card>
           )}
       </div>
    )
}