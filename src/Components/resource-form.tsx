import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';

import { SaveButton } from '../Components/save-button';
import { Resource } from '../Interfaces/resource';

import { ContentForm } from './resource-form/content-form';
import { IntellectualPropertyForm } from './resource-form/intellectual-property-form';
import { InstantiationsForm } from './resource-form/instantiations-form';
import { MediaForm } from './resource-form/media-form';

import "../Styles/components/resource-form.css";
import { mountFormDefaultValues } from '../Utils/mount-resource-form-default-values';

const formStates = {
  CONTENT: 'content',
  INTELLECTUAL: 'intelectual_property',
  INSTANTIATIONS: 'instantiations',
  MEDIA: 'media_files'
}

interface Props {
  submit(data: FormData): void
  defaultValues?: Resource
}

export function ResourceForm({ submit, defaultValues } : Props){
  const defaultFormValues = mountFormDefaultValues(defaultValues)

  const { control, handleSubmit, setValue } = useForm({
    defaultValues,
  })

  var date = new Date()
  var last_modification = date.getFullYear() +'-'+(date.getMonth()+1)+'-'+ date.getDate();

  const [form1Done, setForm1Done] = useState(false)
  const [form2Done, setForm2Done] = useState(false)
  const [form3Done, setForm3Done] = useState(false)
  const [form4Done, setForm4Done] = useState(false)

  const [formState, setFormState] = useState('');

  const onSubmit = handleSubmit((values) => {
    const dataForm = new FormData();

    console.log(values)

    // dataForm.append('title', values.title)
    // dataForm.append('author', values.author)
    // dataForm.append('type', values.type)
    // dataForm.append('language', values.language)
    // dataForm.append('license', values.license)
    // dataForm.append('description', values.description)
    // dataForm.append('date_of_publishment', values.date_of_publishment)
    // dataForm.append('subject', values.subject)
    // dataForm.append('keywords', values.keywords)
    // dataForm.append('audience', values.audience)
    // dataForm.append('external_url', values.external_url)
    // dataForm.append('relation', values.relation)
    // dataForm.append('contributor', values.contributor)
    // dataForm.append('publisher', values.publisher)
    // dataForm.append('format', values.format)
    // dataForm.append('technical_requirements', values.technical_requirements)
    // dataForm.append('description_of_technical_requirements', values.description_of_technical_requirements)
    // dataForm.append('last_modification', last_modification)
    // dataForm.append('video', values.video)
    // dataForm.append('file', values.file)

    // submit(dataForm)
  })
  
  function handleOpenForm(state: string){
    setFormState(state)
  }

  return(
    <div className="form-wrapper">
      <h1 className="title">Preencha as informações corretamente e contribua com a democratização do conhecimento.</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="section">
          <div className="section-title">
            <h3>Contéudo</h3>
            <span className={form1Done ? "check" : "arrow"} onClick={() => handleOpenForm(formStates.CONTENT)}></span>
          </div>

          {formState === formStates.CONTENT &&
            <ContentForm defaultValues={defaultFormValues.content} submitCallback={() => {}}/>
          }  
        </div>

        <div className="section">
          <div className="section-title">
            <h3>Propriedade Intelectual</h3>
            <span className={form2Done ? "check" : "arrow"} onClick={() => handleOpenForm(formStates.INTELLECTUAL)}></span>
          </div>

        {formState === formStates.INTELLECTUAL &&
          <IntellectualPropertyForm
            defaultValues={defaultFormValues.intelectual_property} 
            submitCallback={() => {}}
          />
        }
        </div>

        <div className="section">

          <div className="section-title">
            <h3>Especificações</h3>
            <span className={form3Done ? "check" : "arrow"} onClick={() => handleOpenForm(formStates.INSTANTIATIONS)}></span>
          </div>

          {formState === formStates.INSTANTIATIONS &&
            <InstantiationsForm 
              defaultValues={defaultFormValues.instantiations} 
              submitCallback={() => {}}
            />
          }
        </div>

        <div className="section" id="images">

          <div className="section-title">
              <h3>Mídias</h3>
              <span className={form4Done ? "check" : "arrow"} onClick={() => handleOpenForm(formStates.MEDIA)}></span>
            </div>

        {formState === formStates.MEDIA &&
          <MediaForm 
            defaultValues={defaultFormValues.media} 
            submitCallback={() => {}}
          />
        }
        </div>
      <SaveButton label="Publicar" />
    </form>
    </div>
   )
}