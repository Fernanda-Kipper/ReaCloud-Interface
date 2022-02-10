import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3200' : process.env.REACT_APP_AUTH_REDIRECT_URI,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios;