import React, { useState, FormEvent } from 'react'
import { toast } from 'react-toastify'
import ContentLoader from 'styled-content-loader'
import { Link } from 'react-router-dom'
import { BsSearch, BsFilter } from 'react-icons/bs'

import axios from '../Services/axiosConfig'

import ResourceCard from '../Components/resourceCard'
import Resource from '../Interfaces/resource'

import goBackImg from '../Images/goBack.svg'
import filterImg from '../Images/filter.svg'

import '../Styles/pages/search.css'
import 'react-toastify/dist/ReactToastify.css';


function SearchPage() {
    const [keyword,setKeyword] = useState('')
    const [filter, setFilter] = useState('filterDisable')
    const [loading, setLoding] = useState(false)
    const [results, setResults] = useState<Resource[]>([])
    const [audience, setAudience] = useState('')
    const [type, setType] = useState('')

    function handleSubmit(event: FormEvent){
        setLoding(true)
        event.preventDefault()
        axios.get('/resources/search', {params: {keywords: keyword}}).then(res =>{
            setResults(res.data)
            setLoding(false)
        })
        .catch(err=>{
            setLoding(false)
            toast.error('Erro ao buscar por recurso. Confira os dados e tente novamente mais tarde')
        })
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
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="Busque palavras chaves/titulo/autor. Ex: Matemática"/>
                    <button type="submit">
                        <BsSearch/>
                    </button>
                </form>
            </header>
            <main>
                <aside className="filter">
                    <button onClick={handleFilterClick}>
                        <BsFilter size="lg"/>
                    </button>
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
                            <div className="result-container">
                                {results.map((element) => (
                                    <ResourceCard 
                                        title={element.title}
                                        id={element.id}
                                        description={element.description}
                                        image={element.image.url}>
                                    </ResourceCard>
                                ))}
                            </div>
                        ): (<h2>Nenhum recurso bate com a sua busca</h2>)}
                    </ContentLoader>
                </section>
            </main>
        </div>
    );
}

export default SearchPage;
