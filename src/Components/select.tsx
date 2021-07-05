import React from 'react';

import '../Styles/components/select.css';
import { Label } from './label';

interface Option {
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
}

export function Select({name, value, handleChange, isRequired = false, label, options, tooltipText}: SelectProps){
   return(
       <div className="select-wrapper">
        <Label name={name} label={label}  isRequired={isRequired} tooltipText={tooltipText}/>
        <select required={isRequired} value={value} onChange={e => handleChange(e.target.value)}>
            <option value="" disabled selected hidden>Selecione</option>
            {options.map(item => (
              <React.Fragment key={item.value}>
                <option value={item.value}>{item.label}</option>
              </React.Fragment>
            ))}
        </select>
       </div>
   )
}