import { useQuery } from 'react-query';
import axios from '../Services/axiosConfig';

interface UserData {
  name: string,
};

async function  fetcher(): Promise<UserData> {
  const { data } = await axios.get('/authentication')

  return data;
};

export function useUserData(){
  return useQuery('user', fetcher, {
    staleTime: 1000 * 60
  })
};