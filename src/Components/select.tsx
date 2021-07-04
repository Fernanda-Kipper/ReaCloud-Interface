import React from 'react';

import '../Styles/components/select.css';

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
}

export function Select({name, value, handleChange, isRequired = true, label, options }: SelectProps){
   return(
       <div className="select-wrapper">
        <label htmlFor={name}>
          {isRequired && <span>*</span>}
          {label}
        </label>
        <select required={isRequired} value={value} onChange={e => handleChange(e.target.value)}>
            <option value="" disabled selected hidden>Selecione</option>
            {options.map(item => (
              <option value={item.value}>{item.label}</option>
            ))}
        </select>
       </div>
   )
}