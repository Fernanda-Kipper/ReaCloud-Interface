import React from 'react'
import { Control, Controller } from 'react-hook-form' 

import { Checkbox } from '../checkbox'

interface Props {
  name: string,
  isRequired?: boolean,
  label: string,
  tooltipText?: string,
  control: Control<any>, 
  defaultValue: boolean, 
}

export const ControlledCheckbox = ({ 
  control, 
  defaultValue = false, 
  name, 
  label,
  isRequired = false, 
  tooltipText = "" }: Props ) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ field: { onChange, value } }) => (
      <Checkbox
        label={label}
        isRequired={isRequired}
        value={value as boolean}
        handleChange={onChange}
        name={name}
        tooltipText={tooltipText}
      />
    )}
  />
)
