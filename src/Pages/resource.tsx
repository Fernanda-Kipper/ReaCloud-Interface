import React, { useEffect, useState } from 'react';
import {  useParams, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import LinkIcon from '@material-ui/icons/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import StorageIcon from '@material-ui/icons/Storage';

import '../Styles/pages/resource.css'
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Components/header';
import EvaluationForm from '../Components/evaluation-form';
import { EvaluationList } from '../Components/evaluation-list';
import StyledRate from '../Components/styled-rating';
import { ResourceData } from '../Components/resource-data';
import When from '../Components/when';

import { useResource } from '../hooks/useResource';
import { useEvaluations } from '../hooks/useEvaluations';
import { Licenses } from '../Constants/licenses';
import License from '../Interfaces/license';
import ParameterPassedToUrl from '../Interfaces/parameter-id';

enum TabsType {
    'data',
    'evaluation'
}

const useStyles = makeStyles({
    root: {
      width: '100%',
      color: '#cccccc',
      background: 'white'
    }
});

  
function ResourcePage() {
    const params: ParameterPassedToUrl = useParams();
    const { data: resource, isLoading, isError } = useResource(params.id);
    const { data: evaluations } = useEvaluations(params.id);
    const [license, setLicense] = useState<License>();
    const [tab, setTab] = useState<TabsType>(TabsType.data);
    const [isEvaluating, setIsEvaluating] = useState(false);
    
    const classes = useStyles();

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: TabsType) => {
        setTab(newValue)
    };

    const handleClickEvaluationForm = () => {
        setIsEvaluating(prevState => !prevState)
    }

    useEffect(() => {
        if(!resource) return
        setLicense(Licenses[resource?.license] ?? '')
    }, [resource])


    useEffect(() => {
        if(!isError) return
        toast.warn('Não foi possível carregar dados do recurso')
    }, [isError])
    
  return (
    <div className="resource-content">
        <Header></Header>
        <main>
            <section className="resource-header">
                <div className="identity">
                    <h1 className="title">{resource?.title}</h1>
                    <div className="interaction">
                        <LinkIcon color="primary"/>
                        <a href={resource?.external_url}>Visualizar material</a>
                    </div>
                </div>
                <StyledRate value={evaluations?.average} size='small'/>
            </section>
            <div className="media">
                <img src={resource?.image.url ?? ''} alt={`Imagem do recurso ${resource?.title}`}/>
                <When expr={!!resource?.video_link}>
                    <iframe 
                        title="video" 
                        src={resource?.video_link.replace('watch?v=', 'embed/')} 
                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                        </iframe>
                </When>
            </div>
            <Paper square className={classes.root}>
                <Tabs
                    value={tab}
                    onChange={handleChangeTab}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab icon={< StorageIcon/>} label="DADOS"/>
                    <Tab icon={<ThumbUpIcon />} label="AVALIAÇÕES" />
                </Tabs>
            </Paper> 
            <When expr={tab === TabsType.data}>
                <ResourceData isLoading={isLoading} resource={resource} license={license}/>
            </When>
            <When expr={tab === TabsType.evaluation}>
                <EvaluationList onClick={handleClickEvaluationForm} id={params.id}/>
            </When>
            <EvaluationForm 
                isOpen={isEvaluating} 
                id={params.id} 
                handleClose={handleClickEvaluationForm}
            />
        </main>
    </div>
  )}

export default withRouter(ResourcePage);
