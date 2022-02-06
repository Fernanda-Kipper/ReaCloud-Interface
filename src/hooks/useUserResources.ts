import { useQuery } from 'react-query';
import { Resource } from '../Interfaces/resource';
import axios from '../Services/axios-config';
import { getToken } from '../Utils/local-storage';

const ONE_MINUTE = 1000 * 60

async function  fetcher(accessToken: string): Promise<Resource[]> {
  const { data } = await axios.get('/user/resources', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })

  return data;
};

export function useUserResources(){
  const accessToken = getToken()
  return useQuery('user-resources', () => fetcher(accessToken), {
    staleTime: ONE_MINUTE
  })
};