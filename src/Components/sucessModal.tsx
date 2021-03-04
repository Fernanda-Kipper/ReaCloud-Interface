import React from 'react'

import '../Styles/components/sucessModal.css'
import checkImg from '../Images/check.svg'

interface SucessModalProps{
    action: string,
    closeModal: ()=>void
}

export default function SucessModal({ action, closeModal } : SucessModalProps){
    return(
        <div className="overlay">
            <section className="container">
                <h1>Sucesso ao {action}!</h1>
                <img src={checkImg} alt="Sucesso"/>
                <button onClick={closeModal}>OK</button>
            </section>
        </div>
    )
}