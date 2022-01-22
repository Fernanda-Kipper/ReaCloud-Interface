import React from 'react'
import { Controller } from 'react-hook-form' 

import { DefaultInputProps } from '../../../Interfaces/input'
import { TextInput } from '../text-input'

interface TextInputProps extends DefaultInputProps {
  type?: "text" | "url" | "date"
}

export const ControlledInputText = ({ 
  control, 
  defaultValue = "", 
  name, 
  label, 
  isRequired = false, 
  type = "text", 
  tooltipText = "",
  isDisabled = false }: TextInputProps ) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    rules={{
      required: isRequired ?? 'Campo obrigatório'
    }}
    render={({ field: { onChange, value } }) => (
      <TextInput
        label={label}
        isRequired={isRequired}
        value={value as string}
        handleChange={onChange}
        name={name}
        type={type}
        tooltipText={tooltipText}
        isDisabled={isDisabled}
      />
    )}
  />
)
