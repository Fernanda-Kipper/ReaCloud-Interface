import React from 'react';
import { BsInfoCircle } from 'react-icons/bs'

import '../Styles/components/label.css';

interface LabelProps {
  name: string,
  isRequired?: boolean,
  label: string,
  tooltipText?: string,
}

export function Label({ label, name, isRequired = false, tooltipText } : LabelProps){
  return(
    <label htmlFor={name} className="label">
    {isRequired && <span>*</span>}
    {label}
    { tooltipText && (
      <>
        <span className="tooltip-icon">
          <BsInfoCircle/>
        </span>
        <span className="tooltip-message">{tooltipText}</span>
      </>
    )}
  </label>
  )
}