import React, { MouseEventHandler } from 'react';

import '../Styles/components/default-button.css';

interface DefaultButtonProps {
  label: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

export function DefaultButton({ label, onClick = ()=>{} } : DefaultButtonProps){
    return(
      <button className='default-button' type='submit' onClick={onClick}>
        {label}
      </button>
   )
};