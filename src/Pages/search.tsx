import React, { useState, FormEvent } from 'react'
import { FixedSizeList as List } from 'react-window'
import { toast, ToastContainer } from 'react-toastify'
import ContentLoader from 'styled-content-loader'
import { Link } from 'react-router-dom'

import axios from '../Services/axiosConfig'

import ResourceCard from '../Components/resourceCard'
import Resource from '../Interfaces/resource'

import goBackImg from '../Images/goBack.svg'
import openImg from '../Images/open.svg'
import filterImg from '../Images/filter.svg'

import '../Styles/pages/search.css'
import 'react-toastify/dist/ReactToastify.css';


function SearchPage() {
    const [keyword,setKeyword] = useState('')
    const [author, setAuthor] = useState('')
    const [subject, setSubject] = useState('')
    const [advancedSearch, setSearch] = useState('disable')
    const [filter, setFilter] = useState('filterDisable')
    const [loading, setLoding] = useState(false)
    const [results, setResults] = useState<Resource[]>([])
    const [audience, setAudience] = useState('')
    const [type, setType] = useState('')

    function handleSubmit(event: FormEvent){
        setLoding(true)
        event.preventDefault()
        if(advancedSearch === 'enable'){
            axios.get('/resources/search/advanced', {params: {keywords: keyword, author: author, subject: subject}})
            .then(res =>{
                setResults(res.data)
                setLoding(false)
            })
            .catch(err=>{
                setLoding(false)
                toast.error('Erro ao buscar por recurso. Confira os dados e tente novamente mais tarde')
            })
        }
        else{
            axios.get('/resources/search', {params: {keywords: keyword}}).then(res =>{
                setResults(res.data)
                setLoding(false)
            })
            .catch(err=>{
                setLoding(false)
                toast.error('Erro ao buscar por recurso. Confira os dados e tente novamente mais tarde')
            })
        }
    }

    function handleFiltering(event: FormEvent){
        event.preventDefault()
        const filterResults =  results.filter((result)=>{
            if(result.audience === audience || result.type === type){
                return true}
            else{
                return false}
        })
        setResults(filterResults)
    }

    function handleSearchClick(){
        if(advancedSearch === 'enable'){
            setSearch('disable')
        }
        else{
            setSearch('enable')
        }
    }

    function handleFilterClick(){
        if(filter === 'filteringForm'){
            setFilter('filterDisable')
        }
        else{
            setFilter('filteringForm')
        }
    }

    return (
        <div className="search-content">
            <header className="search-header">
                <Link to="/"><img className="goBack" src={goBackImg} alt="Voltar"/></Link>
                <form onSubmit={handleSubmit}>
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="Busca por recursos baseado em palavras chaves. Ex: Matemática"/>
                    <input className={advancedSearch} type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Autor do recurso"/>
                    <select className={advancedSearch} value={subject} onChange={e => setSubject(e.target.value)}>
                        <option value="" disabled defaultChecked hidden>Selecione</option>
                        <option value="Ciências Agrárias">Ciências Agrárias</option>
                        <option value="Ciências Biológicas">Ciências Biológicas</option>
                        <option value="Ciências Exatas e da Terra">Ciências Exatas e da Terra</option>
                        <option value="Ciências Humanas">Ciências Humanas</option>
                        <option value="Ciências da Saúde">Ciências da Saúde</option>
                        <option value="Ciências Sociais Aplicadas">Ciências Sociais Aplicadas</option>
                        <option value="Engenharias Lingüística, Letras e Artes">Engenharias Lingüística, Letras e Artes</option>                        
                        <option value="Multidisciplinar">Multidisciplinar</option>              
                      </select>
                      <div className="formButtons">
                        <button type="submit">Buscar</button>
                        <img src={openImg} onClick={handleSearchClick} alt="Abrir busca avançada"/>
                      </div>
                </form>
            </header>
            <main>
                <aside className="filter">
                    <img src={filterImg} alt="Imagem de filtro" onClick={handleFilterClick}/>
                    <form onSubmit={handleFiltering} className={filter}>
                        <select value={audience} onChange={e => setAudience(e.target.value)} required>
                            <option value="" disabled defaultChecked hidden>Público Alvo</option>
                            <option value="Ensino Infantil">Ensino Infantil</option>
                            <option value="Ensino Fundamental">Ensino Fundamental</option>
                            <option value="Ensino Médio">Ensino Médio</option>
                            <option value="Graduação">Graduação</option>
                            <option value="Pós-Graduação">Pós Graduação</option>                                              
                            <option value="Outro">Outro</option>
                        </select>
                        <select value={type} onChange={e => setType(e.target.value)} required>
                            <option value="" disabled defaultChecked hidden>Tipo de Recurso</option>
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
                        <button type="submit">Filtrar</button>
                    </form>
                </aside>
                <section className="results">
                    <ContentLoader
                      isLoading={loading}
                    >
                        {results.length > 0 ? (
                            <List
                            height={700}
                            width={320}
                            itemCount={results.length}
                            itemSize={350}
                            layout="vertical">
                                {({index, style})=>{
                                    const element = results[index]
                                    return <ResourceCard 
                                        title={element.title}
                                        id={element.id}
                                        description={element.description}
                                        image={element.image.url}>
                                    </ResourceCard>
                                }}
                            </List>
                        ): (<h2>Nenhum recurso bate com a sua busca</h2>)}
                    </ContentLoader>
                </section>
            </main>
            <ToastContainer/>
        </div>
    );
}

export default SearchPage;
