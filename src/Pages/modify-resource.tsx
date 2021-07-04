import React, {FormEvent, useState, useEffect} from 'react';
import {useHistory, useParams, Link} from 'react-router-dom'

import axios from '../Services/axiosConfig'

import '../Styles/pages/modify.css'
import 'react-toastify/dist/ReactToastify.css';

import ContentLoader from 'styled-content-loader'
import { toast } from 'react-toastify';
import Header from '../Components/header'
import UndoButton from '../Components/undo-button';

import ParameterPassedToUrl from '../Interfaces/parameter-id'
import licenceTypes from '../Interfaces/licence-types'
import { Select } from '../Components/select';

function ModifyResource() {
  const params: ParameterPassedToUrl = useParams();
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [modalOn, setModal] = useState(false)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [type, setType] = useState('')
  const [licence, setLicence] = useState('')
  const [language, setLanguage] = useState('')
  const [description, setDescription] = useState('')
  const [date_of_publishment, setDate] = useState('')
  const [subject, setSubject] = useState("")
  const [keywords, setKeywords] = useState('')
  const [audience, setAudience] = useState('')
  const [external_url, setUrl] = useState('')
  const [context, setContext] = useState('')
  const [relation, setRelation] = useState('')
  const [contributor, setContributor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [format, setFormat] = useState('')
  const [technical_requirements, setTechnical_requirements] = useState('')
  const [description_of_technical_requirements, setDescriptionRequirements] = useState('')
  const [video_link, setVideoLink] = useState('')
  var date = new Date()
  var last_modification = date.getFullYear() +'-'+(date.getMonth()+1)+'-'+ date.getDate();

  useEffect(()=>{
    axios.get(`/resource/${params.id}`)
        .then(response =>{
            setTitle(response.data.title)
            setAuthor(response.data.author)
            setType(response.data.type)
            setFormat(response.data.format)
            setPublisher(response.data.publisher)
            setContributor(response.data.contributor)
            setRelation(response.data.relation)
            setUrl(response.data.external_url)
            setAudience(response.data.audience)
            setSubject(response.data.subject)
            setContext(response.data.context)
            setDescription(response.data.description)
            setDescriptionRequirements(response.data.description_of_technical_requirements)
            setKeywords(response.data.keywords)
            setLicence(response.data.licence)
            setLanguage(response.data.language)
            setDate(response.data.date_of_publishment)
            setLicence(response.data.licence)
            setLicence(response.data.licence)
            setTechnical_requirements(response.data.technical_requirements)
            setVideoLink(response.data.video_link)
        })
        .catch((e)=>{
            toast.warn('Não foi possivel carregar dados do recurso, tente mais tarde')
        })
  }, [params.id])

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

    
    try{
      axios.put(`/resource/${params.id}`, dataForm).then(res =>{
        setIsLoading(false)
      }
    ).catch(()=>{
        toast.error('Erro ao publicar recurso. Tente novamente mais tarde')
    })
    }catch(err){
      toast.error('Erro ao publicar recurso. Tente novamente mais tarde')
    }

    setTimeout(()=>{
      history.push('/')
    }, 1000)
}
  
  return (
    <div className="modify-content">
      <Header></Header>
      <main>
        {!modalOn ? (
          <>
          <form onSubmit={handleSubmit}>
            <h3>Preenche as informações com as alterações que deseja realizar</h3>
            <label htmlFor="title">
                *Título do Recurso 
                <div className="informationSource">
                  <h3>Nome dado ao recurso</h3>
                </div>
              </label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required/>

              <label htmlFor="subject">
                *Área do Conhecimento
                <div className="informationSource">
                  <h3>O tópico do conhecimento seguindo <a href="https://www.ufrb.edu.br/pibic/images/repositorio/pdfs/areas_de_conhecimento_capes.pdf">padrão Capes</a></h3>
                </div>
              </label>
              <select id="subject" required value={subject} onChange={e => setSubject(e.target.value)}>
                <option value="Ciências Agrárias">Ciências Agrárias</option>
                <option value="Ciências Biológicas">Ciências Biológicas</option>
                <option value="Ciências Exatas e da Terra">Ciências Exatas e da Terra</option>
                <option value="Ciências Humanas">Ciências Humanas</option>
                <option value="Ciências da Saúde">Ciências da Saúde</option>
                <option value="Ciências Sociais Aplicadas">Ciências Sociais Aplicadas</option>
                <option value="Engenharias Lingüística, Letras e Artes">Engenharias Lingüística, Letras e Artes</option>                        
                <option value="Multidisciplinar">Multidisciplinar</option>              
              </select>

              <label htmlFor="type">
                *Tipo de material
                <div className="informationSource">
                  <h3>A natureza do recurso</h3>
                </div>
              </label>
              <select value={type} onChange={e => setType(e.target.value)} required>
                <option value="" disabled hidden>Selecione</option>
                <option value="Video">Video</option>
                <option value="Livro">Livro</option>
                <option value="Podcast">Podcast</option>
                <option value="Artigo">Artigo</option>
                <option value="Imagem">Imagem</option>
                <option value="Jogo">Jogo</option>
                <option value="Filme">Filme</option>
                <option value="Música">Música</option>
                <option value="Software">Programa</option>
                <option value="Slide">Slide</option>
                <option value="Blog">Blog</option>
                <option value="Website">Website</option>
                <option value="Outro">Outro</option>
              </select>

              <label htmlFor="description">
                *Descrição do recurso
                <div className="informationSource">
                  <h3>Um resumo sobre o recurso</h3>
                </div>
              </label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} required/>

              <label htmlFor="context">
                Contexto
                <div className="informationSource">
                  <h3>O contexto de ...</h3>
                </div>
              </label>
              <select value={context} onChange={e => setContext(e.target.value)} placeholder="Selecione">
              </select>

              <label htmlFor="relation">
                Recurso Relacionado
                <div className="informationSource">
                  <h3>Um recurso educacional que seja correlato</h3>
                </div>
              </label>
              <input type="text" value={relation} onChange={e => setRelation(e.target.value)}/>

              <label htmlFor="external_url">
                URL para o Recurso
                <div className="informationSource">
                  <h3>O link exato em que o recurso está hospedado. <Link to="/help">Veja como hospedar</Link></h3>
                </div>
              </label>
              <input type="url" value={external_url} onChange={e => setUrl(e.target.value)}/>
              <label htmlFor="author">
                *Autor do recurso
                <div className="informationSource">
                  <h3>Entidade ou pessoa responsável pela sua criação</h3>
                </div>
              </label>
              <input type="text" value={author}onChange={e => setAuthor(e.target.value)} required/>

              <label htmlFor="contributor">
                Contribuidores
                <div className="informationSource">
                  <h3>Entidade ou pessoa responsável pela sua manutenção</h3>
                </div>
              </label>
              <input type="text" value={contributor} onChange={e => setContributor(e.target.value)}/>

              <Select
                label="Licença"
                isRequired
                value={licence}
                handleChange={setLicence}
                options={licenceTypes}
                name="licence" />

              <label htmlFor="publisher">
                *Publicador
                <div className="informationSource">
                  <h3>Entidade responsável por disponibilizar o recurso. Exemplo: Youtube</h3>
                </div>
              </label>
              <input type="text" value={publisher} onChange={e => setPublisher(e.target.value)}/>

              <label htmlFor="date_of_publishment">
                *Data de Publicação
                <div className="informationSource">
                  <h3>Data de lançamento</h3>
                </div>
              </label>
              <input type="date" required value={date_of_publishment} onChange={e => setDate(e.target.value)}/>

            <label htmlFor="audience">
              *Público alvo
              <div className="informationSource">
                <h3>O público alvo baseado em seu grau de escolaridade pré definidos pelo Governo Federal</h3>
              </div>
            </label>
            <select value={audience} onChange={e => setAudience(e.target.value)} required>
              <option value="" disabled hidden>Selecione</option>
              <option value="Ensino Infantil">Ensino Infantil</option>
              <option value="Ensino Fundamental">Ensino Fundamental</option>
              <option value="Ensino Médio">Ensino Médio</option>
              <option value="Graduação">Graduação</option>
              <option value="Pós-Graduação">Pós Graduação</option>                                              
              <option value="Outro">Outro</option>
            </select>

            <label htmlFor="language">
              *Idioma
              <div className="informationSource">
                <h3>Linguagem original em que o recurso foi produzido</h3>
              </div>
            </label>
            <select required value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="" disabled hidden>Selecione</option>
              <option value="Português">Português</option>
              <option value="Inglês">Inglês</option>
              <option value="Francês">Francês</option>
              <option value="Espanhol">Espanhol</option>
              <option value="Mandarim">Mandarim</option>
              <option value="Português-Portugal">PT Portugal</option>
              <option value="Outro">Outros</option>
            </select>

            <label htmlFor="keywords">
              *Palavras Chave
              <div className="informationSource">
                <h3>Grupo de palavras que podem ser relacionadas ao recurso</h3>
              </div>
              </label>
            <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="blog,segunda guerra" required/>
            <span>Separe-as por vírgulas sem espaço, em minúsculo todas as letras</span>

            <label htmlFor="format">
              *Formato do Recurso
              <div className="informationSource">
                <h3>O formato do arquivo seguindo o <a href="https://www.iana.org/assignments/media-types/media-types.xhtml">padrão MIME</a></h3>
              </div>
            </label>
            <select required value={format} onChange={e => setFormat(e.target.value)}>
              <option value="" disabled hidden>Selecione</option>
              <option value="CSV">.CSV - Dados tabulares</option>
              <option value="DOC">.DOC - Microsoft word</option>
              <option value="DOCX">.DOCX - Microsoft word aberto xml</option>
              <option value="GIF">.GIF - Imagem/gif</option>
              <option value="HTML">.HTML - Website</option>
              <option value="JPEG/JPG">.JPEG/JPG - Imagem</option>
              <option value="JSON">.JSON - Formato de texto</option>
              <option value="MP3">.MP3 - Áudio</option>
              <option value="MP4">.MP4 - Vídeo</option>
              <option value="MPEG">.MPEG - Vídeo</option>
              <option value="PNG">.PNG - Imagem</option>
              <option value="PDF">.PDF - Documento</option>
              <option value="SVG">.SVG - Vetor gráfico escalável</option>
              <option value="XML">.XML - Formato de texto</option>
              <option value="XML">.ZIP - Arquivo comprimido</option>
              <option value="Outro">Outro</option>
            
            </select>

            <label htmlFor="technical_requirements">
              *Pré Requisitos Técnicos
              <div className="informationSource">
                <h3>Se o recurso exige como pré requisito algum hardware específico</h3>
              </div>
              </label>
            <select required value={technical_requirements} onChange={e => setTechnical_requirements(e.target.value)}>
              <option value='true'>Sim</option>
              <option value='false'>Não</option>
            </select>

            <label htmlFor="description_of_technical_requirements">
              Descrição dos pré requisitos
              <div className="informationSource">
                <h3>Se sim, descrição desses pré requisitos</h3>
              </div>
              </label>
            <textarea value={description_of_technical_requirements} onChange={e => setDescriptionRequirements(e.target.value)}/>

            <label htmlFor="video_link">Caso o recurso possua um vídeo, informe o link seu Youtube</label>
            <input type="url" value={video_link} onChange={e => setVideoLink(e.target.value)}/>
            <button type="submit">Alterar informações</button>
          </form>
          <UndoButton/>
          </>
        ): (
          <ContentLoader isLoading={isLoading}>
            <h2 style={{color: "var(--gray-strong)", fontSize: 18, fontWeight: 'normal'}}>Alterado com sucesso</h2>
          </ContentLoader>
        )
        }
      </main>
    </div>
  );
}

export default ModifyResource;
