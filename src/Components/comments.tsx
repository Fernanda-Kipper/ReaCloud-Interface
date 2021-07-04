import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify'
import StyledRate from './styled-rating';

import axios from '../Services/axiosConfig'

import '../Styles/components/comment.css'
import 'react-toastify/dist/ReactToastify.css';

interface ParameterPassedToUrl{
    id: string;
}

interface Review{
    Id: number,
    Username: string,
    Profile: string,
    Message: string,
    Rate: number
}

interface Props{
    shouldUpdate: boolean;
}

function CommentsList({ shouldUpdate }: Props){
    const [reviews, setReviews] = useState<Review[]>([])
    const params: ParameterPassedToUrl = useParams();

    useEffect(()=>{
        axios.get(`/resource/evaluations/${params.id}`)
        .then(response =>{
            setReviews(response.data[1])
        })
        .catch((err)=>{
            toast.error("Erro ao carregar comentário do recurso, tente mais tarde")
        })
    }, [params.id, shouldUpdate])

    return(
        <div className="rates">
            { reviews.length > 0 ? reviews.map((item: Review)=>{
                return(
                <div key={item.Id} className="rate">
                    <div className="header">
                        <img src="https://icons-for-free.com/iconfiles/png/512/avatar+person+profile+user+icon-1320086059654790795.png" alt="Foto de perfil"/>
                        <h5>{item.Username}</h5>
                        <h6>{item.Profile}</h6>
                    </div>
                    <p>{item.Message}</p>
                    <div className="stars">
                        <StyledRate value={item.Rate}/>
                    </div>
                </div>
                )
            })
            : <h4>Esse recurso não possui avaliações</h4>}
        </div>
    )
}

export default CommentsList;
