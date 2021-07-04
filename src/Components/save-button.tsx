import React, { FormEvent } from 'react';
import { BiSave } from 'react-icons/bi';

import '../Styles/components/saveButton.css';

interface SaveButtonProps {
  label: string,
  onClick?: (event: FormEvent) => Promise<void>;
}

export function SaveButton({ label, onClick } : SaveButtonProps){
    return(
      <button type='submit' className='save-button' onClick={onClick}>
        {label}
        <BiSave/>
      </button>
   )
}