import React, {useState, createContext, ReactNode} from 'react'

interface UserContextData{
    name: string,
    value: boolean,
    setName: (name:string)=>void,
    setValue: (value: boolean)=>void,
}

interface UserContextProps{
    children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export function UserContextProvider({ children } : UserContextProps){
    const [value, setValue] = useState(false)
    const [name, setName] = useState("")

    return(
        <UserContext.Provider value={{
            name,
            value,
            setValue,
            setName
        }}>
            {children}
        </UserContext.Provider>
    )
}