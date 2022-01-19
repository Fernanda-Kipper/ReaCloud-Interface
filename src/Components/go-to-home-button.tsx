import React from 'react';
import { useHistory } from 'react-router';
import { AiOutlineHome } from 'react-icons/ai';

import '../Styles/components/go-to-home-button.css';

export function GoToHomeButton(){
  const { push } = useHistory()

  const goToHome = () => {
    push('/')
  }

  return(
    <button 
      onClick={goToHome} 
      className="go-to-home-button"
    >
      ir para home
      <AiOutlineHome />
    </button>
  )
}