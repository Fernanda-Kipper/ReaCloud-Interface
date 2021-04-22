import React, {useState, createContext, ReactNode, useEffect} from 'react'
import { fetchUserData } from '../Services/fetchUserData'

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

    useEffect(() =>{
        fetchUserData().then(data => {
            if(data){
                setName(data.name)
                setValue(true)
            }
        })
        .catch()
    }, [])

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