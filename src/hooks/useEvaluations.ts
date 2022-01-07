import { useQuery } from 'react-query'
import { EvaluationsPayload } from '../Interfaces/evaluation';
import axios from '../Services/axiosConfig';

async function  fetcher(id: string): Promise<EvaluationsPayload> {
  const { data } = await axios.get(`/resource/evaluations/${id}`)

  return data;
};

export function useEvaluations(resourceId: string){
  const { data, isLoading, isError } = useQuery(
    ['average', resourceId],
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


