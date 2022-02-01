import React from 'react';

import '../../Styles/components/default-input.css';
import { Label } from '../label';

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
  isError?: boolean
}

export function TextInput
({ name, 
  placeholder = "", 
  value, handleChange, 
  type = "text", 
  isRequired = false, 
  label, 
  isDisabled = false, 
  tooltipText,
  isError = false} : DefaultInputProps){
    return(
      <div className="input-wrapper">
        <Label name={name} label={label} isRequired={isRequired} tooltipText={tooltipText}/>
        <input
            className={isError ? 'error' : ''}
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