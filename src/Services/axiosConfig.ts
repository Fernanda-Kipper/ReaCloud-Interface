import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:3200',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios;