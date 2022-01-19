import { useMutation, useQueryClient } from 'react-query'
import axios from '../Services/axiosConfig';

interface MutateParams {
  data: FormData
  id: string
}

async function mutator(formData: FormData, id: string) {
  const { data } = await axios.put(`/resource/${id}`, formData)

  return data;
};

export function usePutResource(){
  const queryClient = useQueryClient()
  const { mutate, ...mutation } = useMutation(
    ({ data, id }: MutateParams) => mutator(data, id),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['resource'])
      }
    }
  )

  const putResource = (data: FormData, id: string) => mutate({ data, id})

  return { putResource, ...mutation }
}


