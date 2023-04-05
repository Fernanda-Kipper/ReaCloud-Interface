import React, { FormEvent } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import '../../Styles/components/default-form.css'

import { ControlledInputText } from '../form/controlled/text-input'
import { ControlledSelect } from '../form/controlled/select'
import { ControlledTextarea } from '../form/controlled/textarea'
import { DefaultButton } from '../default-button';
import subjectsOptions from '../../Constants/subjects';
import resourceTypeOptions from '../../Constants/resource-type-options';
import { ResourceFormPayload } from '../../Interfaces/resource';
import { FormCompleteList } from '../resource-form';
import { BnccSelect } from './bncc-select';

interface Props {
  defaultValues: {
    title?: string,
    subject?: string,
    type?: string,
    description?: string,
    external_url?: string,
    relation?: string
  },
  submitCallback(value: FormCompleteList): void
  form: UseFormReturn<ResourceFormPayload, object>
  completeList: FormCompleteList
}

export function ContentForm(props: Props){
  const { defaultValues, submitCallback, form, completeList } = props
  const { control, formState } = form

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    submitCallback({ ...completeList, content: true })
  }

  const isFormDisabled = !!formState.errors.title 
    || !!formState.errors.subject 
    || !!formState.errors.type
    || !!formState.errors.description
    || !!formState.errors.external_url

  // TODO: transformar Recurso Relacionado em um select, com dados da api, através do que o usuário digita

  return(
    <form className='form-container' onSubmit={onSubmit}>
      <ControlledInputText
        label='Título do Recurso'
        name='title'
        control={control}
        defaultValue={defaultValues?.title}
        isRequired
        isError={!!formState.errors.title}
      />
    
      <ControlledSelect
        control={control}
        defaultValue={defaultValues?.subject}
        options={subjectsOptions}
        label='Área do conhecimento'
        name='subject'
        isRequired
        isError={!!formState.errors.subject}
      />
    
      <ControlledSelect
        control={control}
        defaultValue={defaultValues?.type}
        options={resourceTypeOptions}
        label='Tipo de material'
        name='type'
        isRequired
        isError={!!formState.errors.type}
      />

      <Controller
        control={control}
        name="bncc"
        rules={{
          required: 'Campo obrigatório'
        }}
        render={({ field: { onChange, value } }) => (
          <BnccSelect setSelectedOption={onChange} selectedOption={value}/>
        )}
      />
    
      <ControlledTextarea
        label='Descrição do recurso'
        name='description'
        control={control}
        defaultValue={defaultValues?.description}
        isRequired
        isError={!!formState.errors.description}
      />
    
      <ControlledInputText
        label='Recurso Relacionado'
        name='relation'
        control={control}
        defaultValue={defaultValues?.relation}
      />
    
      <ControlledInputText
        label='Endereço do Recurso (URL)'
        name='external_url'
        isRequired
        tooltipText='Endereço da internet EXATO no qual o recursos está armazenado.'
        control={control}
        defaultValue={defaultValues?.external_url}
        type='url'
        isError={!!formState.errors.external_url}
      />
      <span className='help'><a href='/ajuda'>Nessa página</a> explicamos para você como hospedar seu recurso na nuvem</span>
    
      <DefaultButton label='Confirmar' isDisabled={isFormDisabled}/>
    </form>
  )
}