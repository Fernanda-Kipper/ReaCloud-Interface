import { useQuery } from 'react-query';
import { Resource } from '../Interfaces/resource';
import axios from '../Services/axios-config';

const ONE_MINUTE = 1000 * 60

async function  fetcher(): Promise<Resource[]> {
  const { data } = await axios.get('/profile/resources')

  return data;
};

export function useUserResources(){
  return useQuery('user-resources', fetcher, {
    staleTime: ONE_MINUTE
  })
};