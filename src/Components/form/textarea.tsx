import React from 'react';

import '../../Styles/components/textarea.css';
import { Label } from '../label';

interface TextareaProps {
  name: string,
  placeholder?: string,
  value: string | number,
  handleChange?: Function,
  isRequired?: boolean,
  label: string,
  isDisabled?: boolean,
  tooltipText?: string,
  isError?: boolean
}

export function Textarea({ 
  name, 
  placeholder = "", 
  value, 
  handleChange, 
  isRequired = false, 
  label, 
  isDisabled , 
  tooltipText,
  isError = false }: TextareaProps){
  return(
    <div className="textarea-wrapper">
      <Label name={name} label={label}  isRequired={isRequired} tooltipText={tooltipText}/>
      <textarea
          className={isError ? 'error' : ''}
          placeholder={placeholder}
          value={value}
          onChange={e => handleChange ? handleChange(e.target.value) : ()=>{}}
          required={isRequired}
          disabled={isDisabled}
          />
    </div>
  )
}