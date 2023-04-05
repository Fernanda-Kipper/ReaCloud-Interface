import { Resource } from '../Interfaces/resource'
import { FormatDate } from '../Utils/format-date'

export const RESOURCE_FIELDS = [
  {name:'Autor' , field: (data: Resource) => data?.author ?? '', property: 'dc.author'},
  {name:'Quando o recurso foi criado' , field: (data: Resource) => data?.date_of_publishment ? FormatDate(data.date_of_publishment) : '', property: 'dc.data'},
  {name:'Descrição' , field: (data: Resource) => data?.description ?? '', property: 'dc.description'},
  {name:'Público alvo' , field: (data: Resource) => data?.audience ?? '', property: 'dc.audience'},
  {name:'Área do conhecimento' , field: (data: Resource) => data?.subject ?? '', property: 'dc.subject'},
  {name:'Palavras chave' , field: (data: Resource) => data?.keywords ?? '', property: 'dc.keywords'},
  {name:'Compartilhador por' , field: (data: Resource) => data?.userName ?? '', property: 'dc.created_by'},
  {name:'Recurso correlato' , field: (resource: Resource) => resource?.relation ?? '', property: 'dc.relation'},
  {name:'Ultima modificação na plataforma' , field: (resource: Resource) => resource?.last_modification ? FormatDate(resource?.last_modification) : '', property: 'dc.last_modification'},
  {name:'Tipo de recurso' , field: (resource: Resource) => resource?.type ?? '', property: 'dc.type'},
  {name:'Competência BNCC' , field: (resource: Resource) => resource?.bncc ?? '', property: 'bncc'},
  {name:'Formato do recurso' , field: (resource: Resource) => resource?.format ?? '', property: 'dc.format'},
  {name:'Linguagem' , field: (resource: Resource) => resource?.language ?? '', property: 'dc.language'},
  {name:'Contribuidores do recurso' , field: (resource: Resource) => resource?.contributor ?? '', property: 'dc.contributor'},
  {name:'Local que o recurso foi publicado' , field: (resource: Resource) => resource?.publisher ?? '', property: 'dc.publisher'},
  {name:'Pré-requisitos técnicos' , field: (resource: Resource) => resource?.technical_requirements === true ? 'Sim' : 'Não', property: 'dc.technical_requirements'},
]