import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://reacloud.herokuapp.com'
})

export default axios;