import { useQuery } from 'react-query'
import axios from '../axiosConfig'

interface UserData {
  name: string,
}

async function  getData(): Promise<UserData> {
  const { data } = await axios.get('/authentication')

  return data
}

export function useUserData(){
  return useQuery('user', () => getData(), {
    staleTime: 1000 * 60
})
}