import { useQuery } from 'react-query';
import axios from '../Services/axiosConfig';

const TEN_SECONDS = 1000

interface UserAuthData {
  name?: string,
};

async function  fetcher(): Promise<UserAuthData> {
  const { data } = await axios.get('/authentication')

  return data;
};

export function useUserAuth(){
  return useQuery('auth', fetcher, {
    staleTime: TEN_SECONDS
  })
};