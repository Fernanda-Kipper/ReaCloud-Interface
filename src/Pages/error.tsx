import React from 'react';

import { GoToHomeButton } from '../Components/go-to-home-button';
import Header from '../Components/header';
import { ErrorIcon } from '../Components/icons/error-icon';

import '../Styles/pages/error.css';

export default function ErrorPage(){
  return(
    <div className="error-page-content">
      <Header/>
      <h1>Oops!</h1>
      <h2>Um erro inesperado aconteceu :(</h2>
      <ErrorIcon />
      <GoToHomeButton />
    </div>
  )
}