import React, { FormEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';

import '../../Styles/components/default-form.css'

import { ControlledInputText } from '../form/controlled/text-input'
import { ControlledSelect } from '../form/controlled/select'
import { ControlledTextarea } from '../form/controlled/textarea'
import { DefaultButton } from '../default-button';
import { ResourceFormPayload } from '../../Interfaces/resource';
import audienceOptions from '../../Constants/audience-options';
import languages from '../../Constants/languages-options';
import formatOptions from '../../Constants/format-options';
import { FormCompleteList } from '../resource-form';

const booleanOptions = [
  { value: 'true', label: "Sim"},
  { value: 'false', label: "Não"}
]

interface Props {
  defaultValues: {
    date_of_publishment?: string,
    audience?: string,
    language?: string,
    keywords?: string,
    format?: string,
    technical_requirements?: boolean,
    description_of_technical_requirements?: string,
  },
  submitCallback(value: FormCompleteList): void
  form: UseFormReturn<ResourceFormPayload, object>
  completeList: FormCompleteList
}

export function InstantiationsForm(props: Props){
  const { defaultValues, submitCallback, form, completeList } = props
  const { control, formState } = form

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    submitCallback({ ...completeList, instantiations: true })
  }

  const isFormDisabled = !!formState.errors.date_of_publishment 
  || !!formState.errors.audience 
  || !!formState.errors.type
  || !!formState.errors.language
  || !!formState.errors.keywords
  || !!formState.errors.format
  || !!formState.errors.technical_requirements

  return(
    <form className='form-container' onSubmit={onSubmit}>
      <ControlledInputText
        name="date_of_publishment"
        type="date"
        label="Data que o recurso foi criado"
        control={control}
        defaultValue={defaultValues?.date_of_publishment}
        isRequired
        isError={!!formState.errors.date_of_publishment}
      />

      <ControlledSelect
        control={control}
        defaultValue={defaultValues?.audience}
        label="Público alvo"
        options={audienceOptions}
        name="audience"
        isRequired
        isError={!!formState.errors.audience}
      />

      <ControlledSelect
        control={control}
        defaultValue={defaultValues?.language}
        label="Idioma"
        options={languages}
        name="language"
        isRequired
        isError={!!formState.errors.language}
      />

      <ControlledInputText
        name="keywords"
        label="Palavras-Chave"
        tooltipText="Liste palavras que se relacionam com o recurso, para facilitar a busca após sua publicação"
        control={control}
        defaultValue={defaultValues?.keywords}
        isRequired
        isError={!!formState.errors.keywords}
      />
      <span>Separe-as por vírgulas sem espaço</span>

      <ControlledSelect
        control={control}
        defaultValue={defaultValues?.format}
        label="Formato do Recurso"
        options={formatOptions}
        name="format"
        isRequired
        isError={!!formState.errors.format}
      />
      
      // TODO: transformar em checkbox
      <ControlledSelect
        control={control}
        tooltipText="Este recurso precisa de uma estrutura específica para ser utilizado? Exemplo: precisa de computador com placa de video = SIM"
        isRequired
        isError={!!formState.errors.technical_requirements}
        label="Pré Requisitos Técnicos"
        options={booleanOptions}
        name="technical_requirements"
      />

      // TODO: mostrar só se techinal requirements for true
      <ControlledTextarea
        label="Descrição dos pré-requisitos técnicos"
        tooltipText="Descreva com detalhes os pré-requisitos caso eles existam"
        name="description_of_technical_requirements"
        control={control}
        defaultValue={defaultValues?.description_of_technical_requirements}
      />
    
      <DefaultButton label='Confirmar' isDisabled={isFormDisabled}/>
    </form>
  )
}