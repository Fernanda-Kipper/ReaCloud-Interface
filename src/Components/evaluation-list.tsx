import React from 'react'

import '../Styles/components/evaluation-list.css'
import 'react-toastify/dist/ReactToastify.css';

import { useEvaluations } from '../hooks/useEvaluations';
import When from './when';
import { Evaluation } from '../Interfaces/evaluation'
import StyledRate from './styled-rating';

import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

interface Props{
    id?: string;
    onClick(): void;
}

const LoadingEvaluation = () => (
    <div className="rate">
        <div className="header">
            <Skeleton><Avatar /></Skeleton>
        </div>
        <Typography variant="body2">
            <Skeleton />
        </Typography>
        <div className="stars">
            <Skeleton>
                <StyledRate value={0} size='small'/>
            </Skeleton>
        </div>
    </div>
)

export function EvaluationList({ id, onClick }: Props){
    const { data, isLoading } = useEvaluations(id ?? '')

    return(
        <div className="rates">
            <div className="rates-header">
                <h2>Comentário dos usuários</h2>
                <Button variant="outlined" color="primary" onClick={onClick}>
                    Avalie
                </Button>
            </div>
            <When expr={isLoading}>
                <LoadingEvaluation/>
            </When>
            <When expr={data?.evaluations.length}>
            {data?.evaluations?.map((item: Evaluation) => (
                <div key={item.Id} className="rate">
                    <div className="header">
                        <Avatar />
                        <div className='profile'>
                            <h5>{item.Username}</h5>
                            <h6>{item.Profile}</h6>
                        </div>
                        <StyledRate value={item.Rate} size="small"/>
                    </div>
                    <p>{item.Message}</p>
                </div>
            ))}
            </When>
            <When expr={!data.evaluations.length && !isLoading}>
                <h4>Que pena! Esse recurso ainda não possui avaliações, que tal avaliar?</h4>
            </When>
        </div>
    )
}
