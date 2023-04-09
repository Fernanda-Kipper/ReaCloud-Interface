import { useMutation, useQueryClient } from 'react-query'
import axios from '../Services/axios-config';
import { getToken } from '../Utils/local-storage';

interface EvaluationMutate {
  id: string
}

async function mutator(id: string, accessToken: string) {
  return await  axios.delete(`/resource/${id}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
    })
};

export function useResourceDelete(){
  const queryClient = useQueryClient()
  const accessToken = getToken()
  const { mutate, ...mutation } = useMutation(
    ({id}: EvaluationMutate) => mutator(id, accessToken),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['resource'])
      }
    }
  )

  const deleteResource = (id: string) => mutate({ id })

  return { deleteResource, ...mutation }
}
