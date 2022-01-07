import { useMutation, useQueryClient } from 'react-query'
import { EvaluationFormPayload } from '../Interfaces/evaluation';
import axios from '../Services/axiosConfig';

interface EvaluationMutate {
  id: string, 
  formData: EvaluationFormPayload
}

async function mutator(id: string, formData: EvaluationFormPayload) {
  const { data } = await axios.post(`/resource/evaluations/${id}`, formData)

  return data;
};

export function useEvaluationMutation(){
  const queryClient = useQueryClient()
  const { mutate, ...mutation } = useMutation(
    ({id, formData}: EvaluationMutate) => mutator(id, formData),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['evaluation'])
      }
    }
  )

  const postEvaluation = (id: string, formData: EvaluationFormPayload) =>
    mutate({ id, formData })

  return { postEvaluation, ...mutation }
}


