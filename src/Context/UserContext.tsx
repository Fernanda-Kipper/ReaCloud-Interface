import React, { useState, createContext, ReactNode, useEffect } from 'react';

import { useUser } from '../hooks/useUser';

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
    const { data } = useUser()

    const reset = () => {
        setIsLogged(false)
        setName("")
    }

    useEffect(() => {
        if(!data) return
        setName(data.name)
        setIsLogged(true)
    }, [data])

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