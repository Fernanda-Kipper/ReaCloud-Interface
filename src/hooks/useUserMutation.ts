import { useMutation, useQueryClient } from 'react-query'
import { User } from '../Interfaces/user';
import axios from '../Services/axios-config';
import { getToken } from '../Utils/local-storage';

async function mutator(formData: Partial<User>, accessToken: string) {
  const { data } = await axios.put('/user', formData, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })

  return data;
};

export function useUserMutation(){
  const queryClient = useQueryClient()
  const token = getToken()
  const { mutate, ...mutation } = useMutation(
    (data: Partial<User>) => mutator(data, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
      }
    }
  )

  const mutateProfile = (data: Partial<User>) => mutate(data)

  return { mutateProfile, ...mutation }
}


