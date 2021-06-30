import React from 'react';
import { isIdentifier } from 'typescript';
import '../Styles/components/input.css';

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

export function DefaultInput({ name, placeholder = "", value, handleChange, type = "text", isRequired = true, label, isDisabled } : DefaultInputProps){
   return(
       <div className="input-wrapper">
        <label htmlFor={name}>{label}</label>
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