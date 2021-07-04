import React from 'react';

import '../Styles/components/textarea.css';

interface TextareaProps {
  name: string,
  placeholder?: string,
  value: string | number,
  handleChange?: Function,
  isRequired?: boolean,
  label: string,
  isDisabled?: boolean,
}

export function Textarea({ name, placeholder = "", value, handleChange, isRequired = true, label, isDisabled } : TextareaProps){
   return(
    <div className="textarea-wrapper">
    <label htmlFor={name}>
      {isRequired && <span>*</span>}
      {label}
    </label>
    <textarea
        placeholder={placeholder}
        value={value}
        onChange={e => handleChange ? handleChange(e.target.value) : ()=>{}}
        required={isRequired}
        disabled={isDisabled}
        />
    </div>
   )
}