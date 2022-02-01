import React from 'react';

import '../../Styles/components/select.css';
import { Label } from '../label';

export interface Option {
  label: string,
  value: string | number,
}

interface SelectProps {
  name: string,
  options: Option[],
  value: string | number,
  handleChange: Function,
  isRequired?: boolean,
  label: string,
  tooltipText?: string,
  isError?: boolean
}

export function Select({
  name, 
  value, 
  handleChange, 
  isRequired = false, 
  label, 
  options, 
  tooltipText,
  isError = false}: SelectProps){
    return(
      <div className="select-wrapper">
        <Label name={name} label={label}  isRequired={isRequired} tooltipText={tooltipText}/>
        <select 
          required={isRequired} 
          value={value} 
          onChange={e => handleChange(e.target.value)} 
          className={isError ? 'error' : ''}
        >
          <option value="" disabled hidden>Selecione</option>
            {options.map(item => (
              <React.Fragment key={item.label}>
                <option value={item.value}>{item.label}</option>
              </React.Fragment>
            ))}
        </select>
      </div>
    )
}