import React from 'react'
import { Control, Controller } from 'react-hook-form' 
import { ResourceFormPayload } from '../../../Interfaces/resource'

import { Checkbox } from '../checkbox'

interface Props {
  name: keyof ResourceFormPayload,
  isRequired?: boolean,
  label: string,
  tooltipText?: string,
  control: Control<ResourceFormPayload, object>, 
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
