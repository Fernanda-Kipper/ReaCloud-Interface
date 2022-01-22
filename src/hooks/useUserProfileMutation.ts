import { useMutation, useQueryClient } from 'react-query'
import { UserInfo } from '../Interfaces/user';
import axios from '../Services/axiosConfig';

async function mutator(formData: Partial<UserInfo>) {
  const { data } = await axios.put(`/profile`, formData)

  return data;
};

export function useUserProfileMutation(){
  const queryClient = useQueryClient()
  const { mutate, ...mutation } = useMutation(
    (data: Partial<UserInfo>) => mutator(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', 'auth'])
      }
    }
  )

  const mutateProfile = (data: Partial<UserInfo>) => mutate(data)

  return { mutateProfile, ...mutation }
}


