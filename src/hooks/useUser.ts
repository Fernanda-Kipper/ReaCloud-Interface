import { useQuery } from 'react-query';
import { User } from '../Interfaces/user';
import axios from '../Services/axios-config';
import { getToken } from '../Utils/local-storage';

async function  fetcher(accessToken: string): Promise<User> {
  const { data } = await axios.get('/user', 
    { headers: { 'Authorization': `Bearer ${accessToken}` }
  })

  return data;
};

export function useUser(){
  const accessToken = getToken();

  return useQuery(
    'user', 
    () => fetcher(accessToken), 
    { keepPreviousData: true, enabled: !!accessToken },
  )
};