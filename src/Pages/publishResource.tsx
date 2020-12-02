import React, {FormEvent, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import api from '../Services/apiService';

import '../Styles/pages/publish.css'

import Header from '../Components/header'
import UserContext from '../AuthContext/UserContext'



function PublishResource() {
  const {setValue} = useContext(UserContext)
  const history = useHistory()

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

  const [form1Done, setForm1Done] = useState(false)
  const [form2Done, setForm2Done] = useState(false)
  const [form3Done, setForm3Done] = useState(false)

  const [content, setContent] = useState(false)
  const [intellectualProperty, setIntellectualProperty] = useState(false)
  const [instantiations, setInstantiations] = useState(false)

  var date = new Date()
  var last_modification = date.getDate() +'/'+(date.getMonth()+1)+'/'+ date.getFullYear();

  async function handleSubmit(event: FormEvent){
      event.preventDefault()
  

      const data = {
        title,
        author,
        type,
        language,
        licence,
        description,
        date_of_publishment,
        subject,
        keywords,
        audience,
        external_url,
        context,
        relation,
        contributor,
        publisher,
        format,
        technical_requirements,
        description_of_technical_requirements,
        last_modification
      }


      if(form1Done===true && form2Done===true && form3Done===true){
        try{
          api.post('/resource', data).then(res =>{
            alert('Publicado com sucesso!')
            history.push('/')
          }
          ).catch(()=>{
            setValue(false)
            alert('Erro ao publicar recurso')
            history.push('/')
          })
        }catch(err){
          setValue(false)
          alert('Erro ao publicar recurso')
          history.push('/')
        }
      }else{
        alert('Preencha todos os campos obrigatórios!')
      }
    }
  
  function handleClickContent(){
    if(content === false && !intellectualProperty && !instantiations){
      setContent(true)
    }
  }

  function handleClickIntellectual(){
    if(intellectualProperty === false && !content && !instantiations){
      setIntellectualProperty(true)
    }
  }

  function handleClickInstantiations(){
    if(instantiations === false && !intellectualProperty && !content){
      setInstantiations(true)
    }
  }

  return (
    <div className="publish-content">
      <Header></Header>
        <main>
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
                        URL para o Recurso
                        <div className="informationSource">
                          <h3>O site exato em que o recurso está hospedado</h3>
                        </div>
                        </label>
                      <input type="url" value={external_url} onChange={e => setUrl(e.target.value)}/>

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
                      <input type="text" value={author}onChange={e => setAuthor(e.target.value)} required/>

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
                        <option value="CCBY">CC-BY</option>
                        <option value="CCBYSA">CC-BY-SA</option>
                        <option value="CCBYNC">CC-BY-NC</option>
                        <option value="CCBYND">CC-BY-ND</option>
                        <option value="CCBYNCSA">CC-BY-NC-SA</option>
                        <option value="CCBYNCND">CC-BY-NC-ND</option>

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
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
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
                <button className="confirm-button" onClick={handleSubmit}>
                    Publicar
                </button>
            </div>
        </main>
    </div>
  );
}

export default PublishResource;
