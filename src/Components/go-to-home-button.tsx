import React from 'react';
import { useHistory } from 'react-router';
import { AiOutlineHome } from 'react-icons/ai';

import '../Styles/components/secondary-button.css';

export function GoToHomeButton(){
  const { push } = useHistory()

  const goToHome = () => {
    push('/')
  }

  return(
    <button 
      onClick={goToHome} 
      className="secondary-button"
    >
      ir para home
      <AiOutlineHome />
    </button>
  )
}