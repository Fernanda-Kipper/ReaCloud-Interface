import { useMutation, useQueryClient } from 'react-query'
import axios from '../Services/axiosConfig';

async function mutator(formData: FormData) {
  const { data } = await axios.post(`/resource`, formData)

  return data;
};

export function useResourceMutation(){
  const queryClient = useQueryClient()
  const { mutate, ...mutation } = useMutation(
    (data: FormData) => mutator(data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['resource'])
      }
    }
  )

  const postResource = (data: FormData) => mutate(data)

  return { postResource, ...mutation }
}


