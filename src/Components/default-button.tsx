import React, { MouseEventHandler } from 'react';

import '../Styles/components/default-button.css';

interface DefaultButtonProps {
  label: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  isDisabled?: boolean
}

export function DefaultButton(
  { label, 
    onClick = ()=>{}, 
    isDisabled = false 
  } : DefaultButtonProps ){
  return(
    <button
      className="default-button"
      type='submit'
      onClick={onClick}
      disabled={isDisabled}>
      {label}
    </button>
  )
};