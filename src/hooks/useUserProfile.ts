import { useQuery } from 'react-query';
import { UserInfo } from '../Interfaces/user';
import axios from '../Services/axiosConfig';

const TEN_SECONDS = 1000


async function  fetcher(): Promise<UserInfo> {
  const { data } = await axios.get('/profile')

  return data;
};

export function useUserProfile(){
  return useQuery('user', fetcher, {
    staleTime: TEN_SECONDS
  })
};