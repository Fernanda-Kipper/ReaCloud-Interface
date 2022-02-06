import { useQuery } from 'react-query'
import { Resource } from '../Interfaces/resource';
import axios from '../Services/axios-config';

async function  fetcher(id: string): Promise<Resource> {
  const { data } = await axios.get(`/resource/${id}`)

  return data;
};

export function useResource(resourceId: string){
  const { data, isLoading, isError } = useQuery(
    ['resource', resourceId],
    () => fetcher(resourceId),
    {
      enabled: !!resourceId
    }
  )

  return {
    data,
    isLoading,
    isError
  }
}


