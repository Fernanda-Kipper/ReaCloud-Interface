import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { UserContext } from '../Context/UserContext';
import axios from '../Services/axios-config';
import { Error } from '../Interfaces/error';

export function useLogout(){
  const { reset } = useContext(UserContext);

  async function handleLogout(){
    await axios.get('/logout').then((res: AxiosResponse<any>) =>{
      reset()
      toast.success('Logout realizado com sucesso!')
    }).catch((err: Error) => {
      toast.error('Erro ao realizar Logout, atualize a página')
    })
  }

  return { handleLogout };
}