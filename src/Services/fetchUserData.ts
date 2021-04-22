import axios from './axiosConfig'

export const fetchUserData = () => {
  return axios({
    method: 'GET',
    url: '/authentication',
  }).then((res) => res.data)
}