import { useMutation, useQueryClient } from 'react-query'
import axios from '../Services/axios-config';
import { getToken } from '../Utils/local-storage';

async function mutator(formData: FormData,accessToken: string) {
  const { data } = await axios.post(`/resource`, formData, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })

  return data;
};

export function useResourceMutation(){
  const queryClient = useQueryClient()
  const accessToken = getToken()
  const { mutate, ...mutation } = useMutation(
    (data: FormData) => mutator(data, accessToken),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['resource'])
      }
    }
  )

  const postResource = (data: FormData) => mutate(data)

  return { postResource, ...mutation }
}


