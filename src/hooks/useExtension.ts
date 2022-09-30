import { useEffect, useState } from 'react'
import { EXTENSION_ID } from '../config'
import { PluginData } from '../Interfaces/plugin-data'

export function useExtension(){
  const [error, setError] = useState({ message: "", type: "warn", redirectOnClick: false, state: false})
  const [data, setData] = useState<PluginData[]>([])

  function handleDelete(link: string){
    try{
      chrome.runtime.sendMessage(EXTENSION_ID, { delete: link }, function(response){
        if(response.deleted){
            setData(response.setTargetData)
        }else{
          setError(previous => {return {...previous, state: true, message: "Erro ao deletar material na extensão, verifique se ainda possui o material salvo", type: "error"}})
        }
      })
      }catch(err){
        setError(previous => {return {...previous, state: true, message: "Erro ao deletar material na extensão, tente novamente mais tarde", type: "error"}})
      }
  }

  useEffect(()=>{
    try{
      chrome.runtime.sendMessage(EXTENSION_ID, {getTargetData: true}, function(response){
        if(response.setTargetData){
            setData(response.setTargetData)
        }
      })
      }catch(err){
        setError(previous => {return {...previous, state: true, message: "Você nãa ainda não possui o plugin. Realize o download da extensão do ReaCloud", redirectOnClick: true}})
      }
    },[])

    return { error, data, handleDelete }
}