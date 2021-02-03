import Axios from 'axios'

const axios = Axios.create({
    baseURL: "https://reacloud.herokuapp.com",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios;