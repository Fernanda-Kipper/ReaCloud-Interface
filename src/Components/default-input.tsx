import React from 'react';
import '../Styles/components/defaultInput.css';

interface DefaultInputProps {
  name: string,
  placeholder?: string,
  value: string | number,
  handleChange?: Function,
  type?: string,
  isRequired?: boolean,
  label: string,
  isDisabled?: boolean,
}

export function DefaultInput({ name, placeholder = "", value, handleChange, type = "text", isRequired = false, label, isDisabled } : DefaultInputProps){
   return(
       <div className="input-wrapper">
        <label htmlFor={name}>
          {isRequired && <span>*</span>}
          {label}
        </label>
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