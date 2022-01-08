import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:3200',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

export default axios;