import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';

import { SaveButton } from '../Components/save-button';
import { Resource, ResourceFormPayload } from '../Interfaces/resource';

import { ContentForm } from './resource-form/content-form';
import { IntellectualPropertyForm } from './resource-form/intellectual-property-form';
import { InstantiationsForm } from './resource-form/instantiations-form';
import { MediaForm } from './resource-form/media-form';

import "../Styles/components/resource-form.css";
import { mountFormDefaultValues } from '../Utils/mount-resource-form-default-values';
import { CollapsedSection } from './resource-form/collapsed-section';
import When from './when';

const formStates = {
  CONTENT: 'content',
  INTELLECTUAL: 'intelectual_property',
  INSTANTIATIONS: 'instantiations',
  MEDIA: 'media_files'
}

export interface FormCompleteList {
  content: boolean,
  intellectual: boolean,
  instantiations: boolean,
  media: boolean
}

interface Props {
  submit(data: FormData): void
  defaultValues?: Resource
}

export function ResourceForm({ submit, defaultValues } : Props){
  const defaultFormValues = mountFormDefaultValues(defaultValues)
  const [formState, setFormState] = useState({
    current: '',
    complete: {
      content: false,
      intellectual: false,
      instantiations: false,
      media: false
    }
  });
  
  const form = useForm<ResourceFormPayload>({
    mode: 'all'
  })

  const onSubmit = form.handleSubmit((values) => {
    const dataForm = new FormData();

    const today = new Date()
    const last_modification =  today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate();

    dataForm.append('title', values.title)
    dataForm.append('author', values.author)
    dataForm.append('type', values.type)
    dataForm.append('language', values.language)
    dataForm.append('license', values.license)
    dataForm.append('description', values.description)
    dataForm.append('date_of_publishment', values.date_of_publishment)
    dataForm.append('subject', values.subject)
    dataForm.append('keywords', values.keywords)
    dataForm.append('audience', values.audience)
    dataForm.append('external_url', values.external_url)
    dataForm.append('relation', values.relation)
    dataForm.append('contributor', values.contributor)
    dataForm.append('publisher', values.publisher)
    dataForm.append('format', values.format)
    dataForm.append('technical_requirements', values.technical_requirements.toString())
    dataForm.append('description_of_technical_requirements', values.description_of_technical_requirements)
    dataForm.append('last_modification', last_modification)
    dataForm.append('video', values.video)
    dataForm.append('file', values.file)

    submit(dataForm)
  })
  
  const handleOpenForm = (state: string) => {
    setFormState(prevState => ({
      current: state,
      complete: {
        ...prevState.complete
      }
    }))
  }

  const handleSubmitForms = (state: typeof formState.complete) => {
    setFormState(prevState => ({
      current: '',
      complete: {
        ...state
      }
    }))
  }

  return(
    <div className="form-wrapper">
  
      <h1 className="title">Preencha as informações corretamente e contribua com a democratização do conhecimento.</h1>
      
      <div className="form">
        <div className="section">
          <CollapsedSection 
            title="Contéudo" 
            isComplete={formState.complete.content} 
            handleClick={handleOpenForm} 
            section={formStates.CONTENT}
          />

          <When expr={formState.current === formStates.CONTENT}>
            <ContentForm 
              defaultValues={defaultFormValues.content} 
              submitCallback={handleSubmitForms}
              form={form}
              completeList={formState.complete}
            />
          </When>
        </div>

        <div className="section">
          <CollapsedSection 
            title="Propriedade Intelectual" 
            isComplete={formState.complete.intellectual} 
            handleClick={handleOpenForm} 
            section={formStates.INTELLECTUAL}
          />

          <When expr={formState.current === formStates.INTELLECTUAL}>
            <IntellectualPropertyForm
              defaultValues={defaultFormValues.intelectual_property} 
              submitCallback={handleSubmitForms}
              form={form}
              completeList={formState.complete}
            />
          </When>
        </div>

        <div className="section">
          <CollapsedSection 
              title="Especificações" 
              isComplete={formState.complete.instantiations} 
              handleClick={handleOpenForm} 
              section={formStates.INSTANTIATIONS}
            />

            <When expr={formState.current === formStates.INSTANTIATIONS}>
              <InstantiationsForm 
                defaultValues={defaultFormValues.instantiations} 
                submitCallback={handleSubmitForms}
                form={form}
                completeList={formState.complete}
              />
            </When>
        </div>

        <div className="section" id="images">
          <CollapsedSection 
            title="Mídias" 
            isComplete={formState.complete.media} 
            handleClick={handleOpenForm} 
            section={formStates.MEDIA}
          />

          <When expr={formState.current === formStates.MEDIA}>
            <MediaForm 
              defaultValues={defaultFormValues.media} 
              submitCallback={handleSubmitForms}
              form={form}
              completeList={formState.complete}
            />
          </When>
        </div>

        <SaveButton label="Publicar" onClick={onSubmit}/>
      </div>
    </div>
   )
}