import React from 'react'
import { Controller } from 'react-hook-form' 

import { ResourceInputProps } from '../../../Interfaces/input'
import { TextInput } from '../text-input'

interface TextInputProps extends ResourceInputProps {
  type?: "text" | "url" | "date"
}

export const ControlledInputText = ({ 
  control, 
  defaultValue = "", 
  name, 
  label, 
  isRequired = false, 
  type = "text", 
  tooltipText = "" }: TextInputProps ) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    rules={{
      required: isRequired
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
      />
    )}
  />
)
