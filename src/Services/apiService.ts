import axios from 'axios'

const api = axios.create({
    baseURL: 'https://reacloud.herokuapp.com/'
})

export default api;