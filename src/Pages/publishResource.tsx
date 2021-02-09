import React, {FormEvent, useState, useContext, ChangeEvent} from 'react';
import {useHistory, Link} from 'react-router-dom'
import axios from '../Services/axiosConfig'
import UserContext from '../AuthContext/UserContext'

import '../Styles/pages/publish.css'

import Header from '../Components/header'
import ContentLoader from 'styled-content-loader'

import {CCBY, CCBYSA, CCBYNC, CCBYNCND, CCBYNCSA, CCBYND} from '../Interfaces/licences'

function PublishResource() {
  const {setValue} = useContext(UserContext)
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
  const [subject, setSubject] = useState('')
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
  const [image, setImage] = useState<File[]>([])
  const [video_link, setVideoLink] = useState('')
  var date = new Date()
  var last_modification = date.getFullYear() +'-'+(date.getMonth()+1)+'-'+ date.getDate();

  const [form1Done, setForm1Done] = useState(false)
  const [form2Done, setForm2Done] = useState(false)
  const [form3Done, setForm3Done] = useState(false)
  const [form4Done, setForm4Done] = useState(false)

  const [content, setContent] = useState(false)
  const [intellectualProperty, setIntellectualProperty] = useState(false)
  const [instantiations, setInstantiations] = useState(false)
  const [upload, setUpload] = useState(false)

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


      image.map(imageFile => {
        return dataForm.append('image', imageFile)
      })

      if(form1Done===true && form2Done===true && form3Done===true){
        try{
          axios.post('/resource', dataForm).then(res =>{
            setIsLoading(false)
          }
          ).catch(()=>{
            setValue(false)
            alert('Erro ao publicar recurso')
          })
        }catch(err){
          setValue(false)
          alert('Erro ao publicar recurso')
        }
      }else{
        alert('Preencha todos os campos obrigatórios!')
      }
      setTimeout(()=>{
        history.push('/')
      }, 1000)
    }
  
  function handleClickContent(){
    if(content === false && !intellectualProperty && !instantiations && !upload){
      setContent(true)
    }
  }

  function handleClickIntellectual(){
    if(intellectualProperty === false && !content && !instantiations && !upload){
      setIntellectualProperty(true)
    }
  }

  function handleClickInstantiations(){
    if(instantiations === false && !intellectualProperty && !content  && !upload){
      setInstantiations(true)
    }
  }

  function handleClickUpload(){
    if(upload === false && !intellectualProperty && !content && !instantiations){
      setUpload(true)
    }
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
                  <div className="section_title">
                    <h3>Contéudo</h3>
                    <span className={form1Done ? "check" : "arrow"} onClick={handleClickContent}></span>
                  </div>
                  {content ? 
                  <React.Fragment>
                    <form onSubmit={()=>{
                      setContent(false)
                      setForm1Done(true)
                      }}>
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
                      <select value={subject} onChange={e => setSubject(e.target.value)} required>
                        <option value="" disabled selected hidden>Selecione</option>
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
                        <option value="" disabled selected hidden>Selecione</option>
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
                        *URL para o Recurso
                        <div className="informationSource">
                          <h3>O link exato em que o recurso está hospedado. <Link to="/ajuda">Veja como hospedar</Link></h3>
                        </div>
                        </label>
                      <input type="url" value={external_url} onChange={e => setUrl(e.target.value)} required/>

                      <button className="confirm-button" type="submit">
                      Confirmar
                      </button>
                    </form>
                  </React.Fragment> : null}
                </div>

                <div className="section">
                <div className="section_title">
                    <h3>Propriedade Intelectual</h3>
                    <span className={form2Done ? "check" : "arrow"} onClick={handleClickIntellectual}></span>
                  </div>
                  {intellectualProperty ? 
                  <React.Fragment>

                    <form  onSubmit={()=>{
                      setIntellectualProperty(false)
                      setForm2Done(true)}}>

                      <label htmlFor="author">
                        *Autor do recurso
                        <div className="informationSource">
                          <h3>Entidade ou pessoa responsável pela sua criação</h3>
                        </div>
                        </label>
                      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required/>

                      <label htmlFor="contributor">
                        Contribuidores
                        <div className="informationSource">
                          <h3>Entidade ou pessoa responsável pela sua manutenção</h3>
                        </div>
                        </label>
                      <input type="text" value={contributor} onChange={e => setContributor(e.target.value)}/>

                      <label htmlFor="licence">
                        *Licença
                        <div className="informationSource">
                          <h3>Licença aberta padrão <a href="https://creativecommons.org/share-your-work/">Creative Commons</a></h3>
                        </div>
                        </label>
                      <select value={licence} onChange={e => setLicence(e.target.value)} required>
                        <option value="" disabled selected hidden>Selecione</option>
                        <option value={CCBY}>CC-BY</option>
                        <option value={CCBYSA}>CC-BY-SA</option>
                        <option value={CCBYNC}>CC-BY-NC</option>
                        <option value={CCBYND}>CC-BY-ND</option>
                        <option value={CCBYNCSA}>CC-BY-NC-SA</option>
                        <option value={CCBYNCND}>CC-BY-NC-ND</option>

                      </select>

                      <label htmlFor="publisher">
                        *Publicador
                        <div className="informationSource">
                          <h3>Entidade responsável por disponibilizar o recurso. Exemplo: Youtube</h3>
                        </div>
                        </label>
                      <input type="text" value={publisher} onChange={e => setPublisher(e.target.value)}/>

                      <button className="confirm-button" type="submit">
                      Confirmar
                      </button>
                    </form>
                  </React.Fragment> 
                  : null
                  }
                </div>

                <div className="section">
                  <div className="section_title">
                    <h3>Especificações</h3>
                    <span className={form3Done ? "check" : "arrow"} onClick={handleClickInstantiations}></span>
                  </div>
                  {instantiations ? 
                  <React.Fragment>
        
                    <form  onSubmit={()=>{
                      setInstantiations(false)
                      setForm3Done(true)}}>

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
                        <option value="" disabled selected hidden>Selecione</option>
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
                        <option value="" disabled selected hidden>Selecione</option>
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
                        <option value="" disabled selected hidden>Selecione</option>
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

                      <button className="confirm-button" type="submit">
                      Confirmar
                      </button>
                      </form>
                  </React.Fragment>
                  :null
                  }
                </div>
                <div className="section" id="images">
                  <div className="section_title">
                      <h3>Mídias</h3>
                      <span className={form4Done ? "check" : "arrow"} onClick={handleClickUpload}></span>
                    </div>
                { upload ?
                    <form onSubmit={()=>{
                        setUpload(false)
                        setForm4Done(true)}}>
                          <label htmlFor="images">Escolha a imagem para a representação visual do REA</label>
                          <input  accept="image/*" type="file" onChange={handleSelectedImages}/>
                          <label htmlFor="video_link">Caso o recurso possua um vídeo, informe o link seu Youtube</label>
                          <input type="url" value={video_link} onChange={e => setVideoLink(e.target.value)}/>
                          <button className="confirm-button" type="submit">
                            Confirmar
                          </button>
                    </form>
                : null}
                </div>
                <button className="confirm-button" onClick={handleSubmit}>
                    Publicar
                </button>
            </div>
            </>
          ): (
            <ContentLoader isLoading={isLoading}>
              <h2 style={{color: "#7d7d7d", fontSize: 18, fontWeight: 'normal'}}>Publicado com sucesso</h2>
            </ContentLoader>
          )}
        </main>
    </div>
  );
}

export default PublishResource;
