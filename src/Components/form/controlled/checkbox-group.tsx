import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../../label";
import { ControlledCheckbox } from "./checkbox";

import "../../../Styles/components/checkbox-group.css";

type Option = {
  value: string,
  label: string
}

interface Props {
  options: Option[]
  defaultValues: string[]
  label: string
  setValues(value: string[]): void
}

export function ControlledCheckboxGroup(props: Props){
  const { options, defaultValues, setValues } = props
  const { control, setValue, getValues, formState } = useForm()

  useEffect(() => {
    if(!props.defaultValues) return
    defaultValues.map(value => setValue(value, true))
  }, [defaultValues, props.defaultValues, setValue])

  useEffect(() => {
    const formValues = getValues()
    const preferences = Object.keys(formValues).map(key => { 
      if(formValues[key]) return key
      return ''
    }).filter(value => value.length)

    setValues(preferences)
  }, [formState.dirtyFields, getValues, setValues])

  return(
    <div className="checkbox-group">
      <Label name="preferences" label={props.label} isRequired/>
      {options.map(option => 
        <ControlledCheckbox
          key={option.value}
          control={control}
          label={option.label} 
          name={option.label} 
          defaultValue={false} 
        />
      )}
    </div>
  )
}