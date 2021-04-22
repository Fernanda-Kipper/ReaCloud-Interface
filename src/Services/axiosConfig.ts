import Axios from 'axios'

const axios = Axios.create({
    baseURL: "http://18.228.43.244:3200",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios;