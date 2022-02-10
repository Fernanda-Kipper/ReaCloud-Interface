import { useMutation, useQueryClient } from 'react-query'
import { EvaluationFormPayload } from '../Interfaces/evaluation';
import axios from '../Services/axios-config';
import { getToken } from '../Utils/local-storage';

interface EvaluationMutate {
  id: string, 
  formData: EvaluationFormPayload
}

async function mutator(id: string, formData: EvaluationFormPayload, accessToken: string) {
  const { data } = await axios.post(`/resource/evaluations/${id}`, formData, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })

  return data;
};

export function useEvaluationMutation(successCallBack: () => void){
  const queryClient = useQueryClient()
  const accessToken = getToken()
  const { mutate, ...mutation } = useMutation(
    ({id, formData}: EvaluationMutate) => mutator(id, formData, accessToken),
    {
      onSettled: () => {
        successCallBack()
        queryClient.invalidateQueries(['evaluations'])
      }
    }
  )

  const postEvaluation = (id: string, formData: EvaluationFormPayload) =>
    mutate({ id, formData })

  return { postEvaluation, ...mutation }
}


