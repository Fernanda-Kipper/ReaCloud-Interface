import React from 'react';

import '../Styles/components/default-input.css';
import { Label } from './label';

interface DefaultInputProps {
  name: string,
  placeholder?: string,
  value: string | number,
  handleChange?: Function,
  type?: string,
  isRequired?: boolean,
  label: string,
  isDisabled?: boolean,
  tooltipText?: string,
}

export function DefaultInput
({ name, 
  placeholder = "", 
  value, handleChange, 
  type = "text", 
  isRequired = false, 
  label, 
  isDisabled, 
  tooltipText} : DefaultInputProps){

   return(
       <div className="input-wrapper">
          <Label name={name} label={label} isRequired={isRequired} tooltipText={tooltipText}/>
          <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={e => handleChange ? handleChange(e.target.value) : ()=>{}}
              required={isRequired}
              disabled={isDisabled}
              />
        </div>
   )
}