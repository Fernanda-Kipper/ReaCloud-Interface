import React, { useState, createContext, ReactNode } from 'react'

interface ExtensionParamData {
  title: string;
  link: string;
  setTitle: (title: string) => void;
  setLink: (link: string) => void;
}

interface ExtensionParamContextProps {
  children: ReactNode;
}

export const ExtensionParamContext = createContext({} as ExtensionParamData)

export function ExtensionParamProvider({ children } : ExtensionParamContextProps){
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')

  return(
    <ExtensionParamContext.Provider value={{
      title,
      link,
      setLink,
      setTitle,
    }}>
      {children}
    </ExtensionParamContext.Provider>
  )
}