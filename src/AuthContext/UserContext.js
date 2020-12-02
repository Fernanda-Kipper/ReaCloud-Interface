import {createContext} from 'react'

const UserContext = createContext({
    value: false,
    setValue: (value)=>{},
    name: "",
    setUserName: (name)=>{}
})

export default UserContext;