import { useQuery } from 'react-query'
import { EvaluationsPayload } from '../Interfaces/evaluation';
import axios from '../Services/axios-config';

async function  fetcher(id: string): Promise<EvaluationsPayload> {
  const { data } = await axios.get(`/resource/evaluations/${id}`)

  return data;
};

export function useEvaluations(resourceId: string){
  const { data, isLoading, isError } = useQuery(
    ['evaluations', resourceId],
    () => fetcher(resourceId),
    {
      enabled: !!resourceId
    }
  )

  return {
    isLoading,
    isError,
    data: {
      evaluations: data?.evaluations ?? [],
      average: data?.average ?? 5
    }
  }
}


