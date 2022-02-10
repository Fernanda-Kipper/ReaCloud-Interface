import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3200' : process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios;