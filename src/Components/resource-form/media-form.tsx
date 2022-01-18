import React, { ChangeEvent, FormEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';

import '../../Styles/components/default-form.css'

import { ControlledInputText } from '../form/controlled/text-input'
import { DefaultButton } from '../default-button';
import { ResourceFormPayload } from '../../Interfaces/resource';
import { FormCompleteList } from '../resource-form';

interface Props {
  defaultValues: {
    video?: string,
    file?: File
  },
  submitCallback(value: FormCompleteList): void
  form: UseFormReturn<ResourceFormPayload, object>
  completeList: FormCompleteList
}

export function MediaForm(props: Props){
  const { defaultValues, submitCallback, form, completeList } = props
  const { control, setValue } = form

  const handleSelectedImages = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return

    const firstImage = Array.from(event.target.files)[0]
    setValue('file', firstImage)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    submitCallback({ ...completeList, media: true })
  }

  return(
    <form className='form-container' onSubmit={onSubmit}>
      <label htmlFor="file-upload" className="upload-label">
        Escolha a imagem para ser a capa do Recurso
        <input  accept="image/*" name="file" type="file" onChange={handleSelectedImages} required/>
      </label>

      <ControlledInputText
        name="video"
        label="Caso o recurso possua um vídeo, informe o link seu Youtube"
        tooltipText="Este vídeo será mostrado para os usuário que visitarem o recuso aqui no repositório. Exemplo: pode ser um video explicativo ou uma propaganda"
        type="url"
        control={control}
        defaultValue={defaultValues?.video}
      />
      <DefaultButton label='Confirmar' />
    </form>
  )
}