import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

export default function Save(){
    const query = useQuery() 
    useEffect(()=>{
        localStorage.setItem('links', JSON.stringify(query.get("link")))
        console.log(query.get("link"))
    },[query])

    return(
        <></>
    )
}