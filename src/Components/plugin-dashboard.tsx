import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import '../Styles/components/savedUrls.css'
import { useExtension } from '../hooks/useExtension';
import { ExtensionParamContext } from '../Context/ExtensionParamContext';
import { EXTENSION_URL } from '../config';
import { PluginData } from '../Interfaces/plugin-data';

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
        color: "var(--gray-strong)"
    },
    subtitle: {
      fontSize: 14,
      fontFamily: 'Roboto, sans-serif',
      color: "var(--gray-strong)",
      opacity: 0.8
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%'
    }
  });

export default function PluginDashboard(){
    const { data, error, handleDelete } = useExtension()
    const { setPluginData } = useContext(ExtensionParamContext)
    const classes = useStyles()
    const history = useHistory()

    function redirectToDownload(){
        window.location.href = EXTENSION_URL
    }

    function handlePublish(element: PluginData){
        setPluginData(element)
        history.push('/publicar')
    }

    useEffect(()=>{
        if(error.state){
            error.redirectOnClick
                ? toast.warn(error.message, {onClick: redirectToDownload})
                : toast.error(error.message)
        }
    },[error])

    if(!data?.length){
        return(
            <div className="container">
                <p className="sub-description">
                    <br/>
                    Você ainda não possui nenhum material salvo no seu plugin :/
                </p>
            </div>
        )
    }

    return(
       <div className="container">
           {data?.map((element) => 
                <Card className={classes.root} key={element.link}>
                    <CardContent>
                        <Typography className={classes.title}>
                            {element.title? element.title : element.link.replace('https://', '')}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button size="small" color="default" onClick={() => {handlePublish(element)}}>Publicar</Button>
                        <Button size="small" color="secondary" onClick={() => {handleDelete(element.link)}}>Excluir</Button>
                    </CardActions>
                </Card>
            )}
       </div>
    )
}