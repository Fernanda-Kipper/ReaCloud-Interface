import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { UserContext } from '../Context/UserContext';
import axios from '../Services/axios-config';
import { Error } from '../Interfaces/error';
import { clearToken, getToken } from '../Utils/local-storage';

export function useLogout(){
  const { reset } = useContext(UserContext);
  const token = getToken();

  async function handleLogout(){
    await axios.get('/logout', { headers: { 'Authorization': `Bearer ${token}`}}).then((res: AxiosResponse<any>) =>{
      reset()
      clearToken()
      toast.success('Logout realizado com sucesso!')
    }).catch((err: Error) => {
      toast.error('Erro ao realizar Logout, atualize a página')
    })
  }

  return { handleLogout };
}