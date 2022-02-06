import React, {useState, createContext, ReactNode, useEffect } from 'react';

import { useUserAuth } from '../hooks/useUserAuth';

interface UserContextData{
    name: string,
    isLogged: boolean,
    setName(name:string): void,
    setIsLogged(value: boolean): void,
    reset(): void
}

interface UserContextProps{
    children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export function UserContextProvider({ children } : UserContextProps){
    const [isLogged, setIsLogged] = useState(false)
    const [name, setName] = useState("")

    const reset = () => {
        setIsLogged(false)
        setName("")
    }

    // se tiver access token, faz um get no user pra salvar dados. e ver se está autenticado

    return(
        <UserContext.Provider value={{
            name,
            isLogged,
            setIsLogged,
            setName,
            reset
        }}>
            {children}
        </UserContext.Provider>
    )
}