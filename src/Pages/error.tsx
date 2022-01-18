import React from 'react';
import { useHistory } from 'react-router';

import Header from '../Components/header';
import { ErrorIcon } from '../Components/icons/error-icon';

import '../Styles/pages/error.css'

export default function ErrorPage(){
  const { push } = useHistory()

  const goToHome = () => {
    push('/')
  }

  return(
    <div className="error-page-content">
      <Header/>
      <h1>Oops!</h1>
      <h2>Um erro inesperado aconteceu :(</h2>
      <ErrorIcon />
      <button onClick={goToHome}>ir para home</button>
    </div>
  )
}