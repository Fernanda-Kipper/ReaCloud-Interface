import React from 'react';
import { useForm } from 'react-hook-form';

import '../../Styles/components/default-form.css'

import { ControlledInputText } from '../form/controlled/text-input'
import { ControlledSelect } from '../form/controlled/select'
import { DefaultButton } from '../default-button';
import { ResourceFormPayload } from '../../Interfaces/resource';
import { licenseOptions } from '../../Constants/licenses-options';
import { Licenses } from '../../Constants/licenses';

interface Props {
  defaultValues: {
    license?: keyof typeof Licenses,
    author?: string,
    contributor?: string
    publisher?: string
  },
  submitCallback(values: Partial<ResourceFormPayload>): void
}

export function IntellectualPropertyForm({ defaultValues, submitCallback }: Props){
  const { control, handleSubmit, formState } = useForm({defaultValues})

  const onSubmit = handleSubmit((values) => {
    submitCallback(values)
  })

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
        isError={!!formState.errors.author}
      />

      <ControlledInputText
        name="publisher"
        label="Onde foi publicado o recurso?"
        tooltipText="Exemplo: um artigo pode ter sido publicado em uma revista científica, um video no Youtube"
        control={control}
        defaultValue={defaultValues?.publisher}
        isRequired
      />
    
      <DefaultButton label='Confirmar' />
    </form>
  )
}