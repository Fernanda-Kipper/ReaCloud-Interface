import React from 'react';

import '../../Styles/components/checkbox.css';
import { Label } from '../label';

interface Props {
  name: string,
  value: boolean,
  handleChange(value: boolean): void,
  isRequired?: boolean,
  label: string,
  tooltipText?: string,
}

export function Checkbox ({ 
  name,  
  value, 
  handleChange, 
  label,
  tooltipText,
  isRequired = false } : Props){
    return(
      <div className="checkbox-wrapper">
        <Label name={name} label={label} isRequired={isRequired} tooltipText={tooltipText}/>
        <input
          className='checkbox'
          type='checkbox'
          onChange={e => handleChange(e.target.checked)}
          checked={value}
          />
      </div>
    )
}