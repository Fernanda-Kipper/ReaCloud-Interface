import { useEffect, useState } from 'react'
import { extensionID } from '../../config'

export interface Material {
  link: string,
  title: string | null | undefined,
}

export function useExtension(){
  const [error, setError] = useState({ message: "", type: "warn", redirectOnClick: false, state: false})
  const [data, setData] = useState<Material[]>([])

  function handleDelete(link: string){
    try{
      chrome.runtime.sendMessage(extensionID, {delete: link}, function(response){
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
      chrome.runtime.sendMessage(extensionID, {getTargetData: true}, function(response){
        if(response.setTargetData){
            setData(response.setTargetData)
        }
      })
      }catch(err){
        setError(previous => {return {...previous, state: true, message: "Você não tem links salvos. Realize o download da extensão do ReaCloud", redirectOnClick: true}})
      }
    },[])

    return { error, data, handleDelete }
}