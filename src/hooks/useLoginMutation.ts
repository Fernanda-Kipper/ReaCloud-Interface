import { useContext } from 'react';
import { useMutation } from 'react-query'
import { UserContext } from '../Context/UserContext';
import axios from '../Services/axios-config';
import { saveToken } from '../Utils/local-storage';

interface LoginMutation {
  access_code: string
  redirect_uri: string
}

async function mutator(access_code: string, redirect_uri: string) {
  const { data } = await axios.post('/user', { access_code, redirect_uri })

  return data;
};

export function useLoginMutation(){
  const { setName, setIsLogged } = useContext(UserContext)
  const { mutate, ...mutation } = useMutation(
    (({access_code, redirect_uri}: LoginMutation) => mutator(access_code, redirect_uri)),
    {
      onSettled: (data) => {
        saveToken(data.access_token)
        setName(data.name)
        setIsLogged(true)
      }
    }
  )

  const login = (access_code: string, redirect_uri: string) => mutate({ access_code, redirect_uri })

  return { login, ...mutation }
}


