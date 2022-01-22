import React from "react";
import { Controller } from 'react-hook-form' 

import { DefaultInputProps } from '../../../Interfaces/input'
import { Select, Option } from '../select'

interface SelectInputProps extends DefaultInputProps {
  options: Option[]
}

export const ControlledSelect = ({ 
  control, 
  defaultValue = "", 
  name, 
  label, 
  isRequired = false, 
  options, 
  tooltipText = "" } : SelectInputProps) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    rules={{
      required: isRequired ?? 'Campo obrigatório'
    }}
    render={({ field: { onChange, value } }) => (
      <Select
        label={label}
        isRequired={isRequired}
        value={value as string}
        handleChange={onChange}
        name={name}
        options={options}
        tooltipText={tooltipText}
      />
    )}
  />
)