import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.REACT_APP_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default axios;