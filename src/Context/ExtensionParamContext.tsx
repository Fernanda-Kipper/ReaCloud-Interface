import React, { useState, createContext, ReactNode } from 'react'
import { PluginData } from '../Interfaces/plugin-data';

interface ExtensionParamData {
  pluginData?: PluginData,
  setPluginData: (data: PluginData) => void
}

interface ExtensionParamContextProps {
  children: ReactNode;
}

export const ExtensionParamContext = createContext({} as ExtensionParamData)

export function ExtensionParamProvider({ children } : ExtensionParamContextProps){
  const [pluginData, setPluginData] = useState({} as PluginData)

  return(
    <ExtensionParamContext.Provider value={{
      pluginData,
      setPluginData
    }}>
      {children}
    </ExtensionParamContext.Provider>
  )
}