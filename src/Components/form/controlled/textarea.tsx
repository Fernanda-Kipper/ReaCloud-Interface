import React from 'react'
import { Controller } from 'react-hook-form' 

import { DefaultInputProps } from '../../../Interfaces/input'
import { Textarea } from '../textarea'

export const ControlledTextarea = ({ 
  control, 
  defaultValue = "", 
  name, 
  label, 
  isRequired = false, 
  tooltipText= ""}: DefaultInputProps) => (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: isRequired ?? 'Campo obrigatório'
      }}
      render={({ field: { onChange, value } }) => (
        <Textarea
          label={label}
          isRequired={isRequired}
          value={value as string}
          handleChange={onChange}
          name={name}
          tooltipText={tooltipText}
        />
      )}
    />
)