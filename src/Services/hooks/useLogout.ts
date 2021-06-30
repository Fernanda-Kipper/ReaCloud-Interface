import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { UserContext } from '../../Context/UserContext';
import axios from '../axiosConfig';
import { Error } from '../../Interfaces/error';

export function useLogout(){
  const { setValue, setName } = useContext(UserContext);

  async function handleLogout(){
    await axios.get('/logout').then((res: AxiosResponse<any>) =>{
        setValue(false)
        setName("")
        toast.success('Logout realizado com sucesso!')
    }).catch((err: Error) => {
        toast.error('Erro ao realizar Logout, atualize a página')
    })
  }

  return { handleLogout };
}