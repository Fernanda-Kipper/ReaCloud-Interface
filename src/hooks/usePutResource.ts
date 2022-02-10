import { useMutation, useQueryClient } from 'react-query'
import axios from '../Services/axios-config';
import { getToken } from '../Utils/local-storage';

interface MutateParams {
  data: FormData
  id: string
}

async function mutator(formData: FormData, id: string, accessToken: string) {
  const { data } = await axios.put(`/resource/${id}`, formData, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })

  return data;
};

export function usePutResource(){
  const queryClient = useQueryClient()
  const accessToken = getToken()
  const { mutate, ...mutation } = useMutation(
    ({ data, id }: MutateParams) => mutator(data, id,accessToken),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['resource'])
      }
    }
  )

  const putResource = (data: FormData, id: string) => mutate({ data, id})

  return { putResource, ...mutation }
}


