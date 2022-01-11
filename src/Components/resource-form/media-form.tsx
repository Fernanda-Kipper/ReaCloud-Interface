import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

import '../../Styles/components/default-form.css'

import { ControlledInputText } from '../form/controlled/text-input'
import { DefaultButton } from '../default-button';
import { ResourceFormPayload } from '../../Interfaces/resource';

interface Props {
  defaultValues: {
    video?: string,
    file?: File
  },
  submitCallback(values: Partial<ResourceFormPayload>): void
}

export function MediaForm({ defaultValues, submitCallback }: Props){
  const { control, handleSubmit, setValue } = useForm({defaultValues})

  const handleSelectedImages = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return

    const firstImage = Array.from(event.target.files)[0]
    setValue('file', firstImage)
  }

  const onSubmit = handleSubmit((values) => {
    // check if has file
    submitCallback(values)
  })

  return(
    <form className='form-container' onSubmit={onSubmit}>
      <label htmlFor="file-upload" className="upload-label">
        * Escolha a imagem para ser a capa do Recurso
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