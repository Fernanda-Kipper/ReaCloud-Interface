import { Control } from 'react-hook-form'
import { ResourceFormPayload } from "./resource";

export interface ResourceInputProps {
  control: Control<ResourceFormPayload>
  defaultValue?: string
  name: keyof ResourceFormPayload
  label: string
  isRequired?: boolean
  tooltipText?: string
  isError?: boolean
}