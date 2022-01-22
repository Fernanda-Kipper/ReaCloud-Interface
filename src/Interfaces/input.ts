import { Control } from 'react-hook-form'

export interface DefaultInputProps {
  control: Control<any>
  defaultValue?: string
  name: string
  label: string
  isRequired?: boolean
  tooltipText?: string
  isError?: boolean
  isDisabled?: boolean
}