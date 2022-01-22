import { useQuery } from 'react-query';
import axios from '../Services/axiosConfig';

const ONE_MINUTE = 1000 * 60

interface UserData {
  name?: string,
};

async function  fetcher(): Promise<UserData> {
  const { data } = await axios.get('/authentication')

  return data;
};

export function useUserData(){
  return useQuery('user', fetcher, {
    staleTime: ONE_MINUTE
  })
};