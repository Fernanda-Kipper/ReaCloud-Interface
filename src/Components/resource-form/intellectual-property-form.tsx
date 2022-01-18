import React, { FormEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';

import '../../Styles/components/default-form.css'

import { ControlledInputText } from '../form/controlled/text-input'
import { ControlledSelect } from '../form/controlled/select'
import { DefaultButton } from '../default-button';
import { ResourceFormPayload } from '../../Interfaces/resource';
import { licenseOptions } from '../../Constants/licenses-options';
import { Licenses } from '../../Constants/licenses';
import { FormCompleteList } from '../resource-form';

interface Props {
  defaultValues: {
    license?: keyof typeof Licenses,
    author?: string,
    contributor?: string
    publisher?: string
  },
  submitCallback(value: FormCompleteList): void
  form: UseFormReturn<ResourceFormPayload, object>
  completeList: FormCompleteList
}

export function IntellectualPropertyForm(props: Props){
  const { defaultValues, submitCallback, form, completeList } = props
  const { control, formState } = form

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    submitCallback({ ...completeList, intellectual: true })
  }

  const isFormDisabled = !!formState.errors.author 
  || !!formState.errors.license 

  return(
    <form className='form-container' onSubmit={onSubmit}>
      <ControlledInputText
        label="Autor do recurso"
        name="author"
        control={control}
        defaultValue={defaultValues?.author}
        isRequired
        isError={!!formState.errors.author}
      />

      <ControlledInputText
        name="contributor"
        label="Contribuidores"
        tooltipText="Pessoas ou entidades além do autor que contribuíram para a criação do recurso"
        control={control}
        defaultValue={defaultValues?.contributor}
      />

      <ControlledSelect
        control={control}
        defaultValue={defaultValues?.license}
        options={licenseOptions}
        label="Licença"
        name="license"
        isRequired
        isError={!!formState.errors.license}
      />

      <ControlledInputText
        name="publisher"
        label="Onde foi publicado o recurso?"
        tooltipText="Exemplo: um artigo pode ter sido publicado em uma revista científica, um video no Youtube"
        control={control}
        defaultValue={defaultValues?.publisher}
        isRequired
      />
    
      <DefaultButton label='Confirmar' isDisabled={isFormDisabled}/>
    </form>
  )
}