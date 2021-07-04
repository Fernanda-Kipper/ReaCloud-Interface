import React, { FormEvent, useState, ChangeEvent, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../Services/axiosConfig';
import ContentLoader from 'styled-content-loader';
import 'react-toastify/dist/ReactToastify.css';

import '../Styles/pages/publish.css';

import Header from '../Components/header';

import { ExtensionParamContext } from '../Context/ExtensionParamContext';
import { useExtension } from '../Services/hooks/useExtension';
import { DefaultInput } from '../Components/default-input';
import { DefaultButton } from '../Components/default-button';
import { Select } from '../Components/select';

import subjects from '../Interfaces/subjects';
import resourceTypes from '../Interfaces/resource-types';
import licenceTypes from '../Interfaces/licence-types';
import publicTypes from '../Interfaces/public-types';
import formatTypes from '../Interfaces/format-types';
import languages from '../Interfaces/languages';
import { Textarea } from '../Components/textarea';
import { SaveButton } from '../Components/save-button';

const formStates = {
  CONTENT: 'content',
  INTELLECTUAL: 'intelectual_property',
  INSTANTIATIONS: 'instantiations',
  MEDIA: 'media_files'
}

const booleanType = [
  { value: 'true', label: "Sim"},
  { value: 'false', label: "Não"}
]

function PublishResource() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [modalOn, setModal] = useState(false)
  const { handleDelete } = useExtension()
  const params = useContext(ExtensionParamContext)

  const [title, setTitle] = useState(params.title ? params.title : '')
  const [author, setAuthor] = useState('')
  const [type, setType] = useState('')
  const [licence, setLicence] = useState('')
  const [language, setLanguage] = useState('')
  const [description, setDescription] = useState('')
  const [date_of_publishment, setDate] = useState('')
  const [subject, setSubject] = useState('')
  const [keywords, setKeywords] = useState('')
  const [audience, setAudience] = useState('')
  const [external_url, setUrl] = useState(params.link ? params.link : '')
  const [context, setContext] = useState('')
  const [relation, setRelation] = useState('')
  const [contributor, setContributor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [format, setFormat] = useState('')
  const [technical_requirements, setTechnicalRequirements] = useState('')
  const [description_of_technical_requirements, setDescriptionRequirements] = useState('')
  const [image, setImage] = useState<File[]>([])
  const [video_link, setVideoLink] = useState('')
  var date = new Date()
  var last_modification = date.getFullYear() +'-'+(date.getMonth()+1)+'-'+ date.getDate();

  const [form1Done, setForm1Done] = useState(false)
  const [form2Done, setForm2Done] = useState(false)
  const [form3Done, setForm3Done] = useState(false)
  const [form4Done, setForm4Done] = useState(false)

  const [formState, setFormState] = useState(params.link ? formStates.CONTENT : '');

  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }
    const images1 = Array.from(event.target.files)
    setImage(images1)
  }

  async function handleSubmit(event: FormEvent){
      event.preventDefault()
      setModal(true)
      setIsLoading(true)

      const dataForm = new FormData();
      dataForm.append('title', title)
      dataForm.append('author', author)
      dataForm.append('type', type)
      dataForm.append('language', language)
      dataForm.append('licence', licence)
      dataForm.append('description', description)
      dataForm.append('date_of_publishment', date_of_publishment)
      dataForm.append('subject', subject)
      dataForm.append('keywords', keywords)
      dataForm.append('audience', audience)
      dataForm.append('external_url', external_url)
      dataForm.append('context', context)
      dataForm.append('relation', relation)
      dataForm.append('contributor', contributor)
      dataForm.append('publisher', publisher)
      dataForm.append('format', format)
      dataForm.append('technical_requirements', technical_requirements)
      dataForm.append('description_of_technical_requirements', description_of_technical_requirements)
      dataForm.append('last_modification', last_modification)
      dataForm.append('video', video_link)
      dataForm.append('file', image[0])

      if(form1Done===true && form2Done===true && form3Done===true){
        try{
          axios.post('/resource', dataForm).then(res =>{
            setIsLoading(false)
            toast.success('Sucesso ao publicar recurso!')
            
            if(params){
              handleDelete(params.link)
            }

            setTimeout(()=>{
              history.push('/')
            }, 1000)
          }
          ).catch(()=>{
            toast.error('Erro ao publicar recurso. Tente novamente tarde')
          })
        }catch(err){
          toast.error('Erro ao publicar recurso. Tente novamente mais tarde')
        }
      }else{
        toast.warn('Preencha todos os campos obrigatórios!')
      }
    }
  
  function handleOpenForm(state: string){
    setFormState(state)
  }

  return (
    <div className="publish-content">
      <Header></Header>
        <main>
          {!modalOn ? (
            <>
            <h1 className="title">Preencha as informações corretamente e contribua com a democratização do conhecimento.</h1>
            <div className="form">

                <div className="section" id="content">

                  <div className="section-title">
                    <h3>Contéudo</h3>
                    <span className={form1Done ? "check" : "arrow"} onClick={() => handleOpenForm(formStates.CONTENT)}></span>
                  </div>

                  {formState === formStates.CONTENT &&
                  <form onSubmit={()=>{
                    setFormState('')
                    setForm1Done(true)
                    }}>

                    <DefaultInput
                      label="Título do Recurso"
                      isRequired
                      value={title}
                      handleChange={setTitle}
                      name="title" />

                    <Select
                      options={subjects}
                      label="Área do conhecimento"
                      name="subject"
                      isRequired
                      value={subject}
                      handleChange={setSubject} />

                    <Select
                      options={resourceTypes}
                      label="Tipo de material"
                      name="type"
                      isRequired
                      value={type}
                      handleChange={setType} />

                    <Textarea
                      isRequired
                      label="Descrição do recurso"
                      value={description}
                      handleChange={setDescription}
                      name="description"
                    />

                    <Select
                      options={[]}
                      label="Contexto"
                      name="context"
                      value={context}
                      handleChange={setContext} />

                    <DefaultInput
                      label="Recurso Relacionado"
                      value={relation}
                      handleChange={setRelation}
                      name="relation" />

                    <DefaultInput
                      label="Endereço do Recurso (URL)"
                      isRequired
                      value={external_url}
                      handleChange={setUrl}
                      name="url"
                      type="url" />

                    <DefaultButton label="Confirmar"/>
                    </form>
                  }  
                </div>

                <div className="section">

                <div className="section-title">
                  <h3>Propriedade Intelectual</h3>
                  <span className={form2Done ? "check" : "arrow"} onClick={() => handleOpenForm(formStates.INTELLECTUAL)}></span>
                </div>

                {formState === formStates.INTELLECTUAL &&
                  <form  onSubmit={()=>{
                    setFormState('')
                    setForm2Done(true)}}>

                    <DefaultInput
                      label="Autor do recurso"
                      isRequired
                      value={author}
                      handleChange={setAuthor}
                      name="author" />

                    <DefaultInput
                      label="Contribuidores"
                      value={contributor}
                      handleChange={setContributor}
                      name="contributor" />

                    <Select
                      label="Licença"
                      isRequired
                      value={licence}
                      handleChange={setLicence}
                      options={licenceTypes}
                      name="licence" />

                    <DefaultInput
                      label="Quem publicou o recurso?"
                      value={publisher}
                      handleChange={setPublisher}
                      name="publisher" />

                    <DefaultButton label="Confirmar"/>
                  </form>
                }
                </div>

                <div className="section">

                  <div className="section-title">
                    <h3>Especificações</h3>
                    <span className={form3Done ? "check" : "arrow"} onClick={() => handleOpenForm(formStates.INSTANTIATIONS)}></span>
                  </div>

                  {formState === formStates.INSTANTIATIONS &&
                    <form  onSubmit={()=>{
                      setFormState('')
                      setForm3Done(true)}}>

                      <DefaultInput
                        label="Data que o recurso foi criado"
                        isRequired
                        value={date_of_publishment}
                        handleChange={setDate}
                        name="date_of_publishment"
                        type="date"
                      />

                      <Select
                        value={audience}
                        handleChange={setAudience}
                        isRequired
                        label="Público alvo"
                        options={publicTypes}
                        name="audience"
                      />

                      <Select
                        value={language}
                        handleChange={setLanguage}
                        isRequired
                        label="Idioma"
                        options={languages}
                        name="language"
                      />

                      <DefaultInput
                        label="Palavras Chave"
                        value={keywords}
                        handleChange={setKeywords}
                        name="keywords"
                        isRequired />
                      <span>Separe-as por vírgulas sem espaço</span>

                      <Select
                        value={format}
                        handleChange={setFormat}
                        isRequired
                        label="Formato do Recurso"
                        options={formatTypes}
                        name="format"
                      />

                      <Select
                        value={technical_requirements}
                        handleChange={setTechnicalRequirements}
                        isRequired
                        label="Pré Requisitos Técnicos"
                        options={booleanType}
                        name="technical_requirements"
                      />

                      <Textarea
                        label="Descrição dos pré-requisitos técnicos"
                        value={description_of_technical_requirements}
                        handleChange={setDescriptionRequirements}
                        name="description_of_technical_requirements"
                      />

                      <DefaultButton label="Confirmar"/>
                    </form>
                  }
                </div>

                <div className="section" id="images">

                  <div className="section-title">
                      <h3>Mídias</h3>
                      <span className={form4Done ? "check" : "arrow"} onClick={() => handleOpenForm(formStates.MEDIA)}></span>
                    </div>

                { formState === formStates.MEDIA &&
                  <form onSubmit={()=>{
                    setFormState('')
                    setForm4Done(true)}}>
                      <label htmlFor="file-upload" className="upload-label">
                        * Escolha a imagem para ser a capa do Recurso
                        <input  accept="image/*" type="file" onChange={handleSelectedImages}/>
                      </label>
                      
                      <DefaultInput
                        label="Caso o recurso possua um vídeo, informe o link seu Youtube"
                        value={video_link}
                        handleChange={setVideoLink}
                        name="video_link"
                      />

                      <DefaultButton label="Confirmar"/>
                  </form>
                }
                </div>

                <SaveButton label="Publicar" onClick={handleSubmit}/>
            </div>
            </>
          ): (
            <ContentLoader isLoading={isLoading}>
              <h2 style={{color: "var(--gray-strong)", fontSize: 18, fontWeight: 'normal'}}>Publicado com sucesso</h2>
            </ContentLoader>
          )}
        </main>
    </div>
  );
}

export default PublishResource;
