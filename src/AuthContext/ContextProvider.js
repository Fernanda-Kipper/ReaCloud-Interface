import React, {useState} from 'react'
import UserContext from './UserContext'

const UserContextProvider = ({ children })=>{
    const [value, setValue] = useState(false)
    const [name, setUserName] = useState("")
    return(
        <UserContext.Provider
            value={{value, setValue, name, setUserName}}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;

