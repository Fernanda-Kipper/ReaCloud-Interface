import React from 'react';
import { BiSave } from 'react-icons/bi';

import '../Styles/components/saveButton.css';

interface SaveButtonProps {
  label: string,
}

export function SaveButton({ label } : SaveButtonProps){
    return(
      <button type='submit' className='save-button'>
        {label}
        <BiSave/>
      </button>
   )
}