import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom';

import axios from '../Services/axiosConfig'

import '../Styles/components/resourceItem.css'

interface ResourceItemProps{
    title: string,
    last_modification: string,
    id: number
}

const ResourceItem: React.FunctionComponent< ResourceItemProps > = ({title,last_modification,id, ...rest}) => {
    const [submenuActivated, setSubmenuActivated] = useState(false)
    const [submenuClassName, setSubmenuClassname] = useState('Noactivated')
    const history = useHistory()

    function handleActivation(){
        if (!submenuActivated){
            setSubmenuActivated(true)
            setSubmenuClassname('activated')
        }
        else{
            setSubmenuActivated(false)
            setSubmenuClassname('Noactivated')
        }
    }

    async function handleDelete(){
        setSubmenuActivated(false)
        setSubmenuClassname('Noactivated')
        var value=window.confirm("Se quer deletar esse recurso aperte em confirmar");
        if (value)
        {
            await axios.delete(`/resource/${id}`)
            .then(res =>{
                alert("Deletado com sucesso")
            })
            .catch((err)=>{
                alert("Erro ao deletar recurso")
            })
            history.push('/')
        }
    }

    return(
        <li className="Recurso">
            <ul>
                <li><h6 onClick={handleActivation}>...</h6>
                    <ul className={submenuClassName}>
                        <li><Link className="editDel" to={`/recurso/editar/${id}`}>Editar</Link></li>
                        <li><h5 className="editDel" onClick={handleDelete}>Excluir</h5></li>
                   </ul>
                </li>
            </ul>
            <Link to={`/recurso/${id}`}>{ title }</Link>
            <p className='data'>Última modificação: { last_modification }</p>
        </li>
    )
}

export default ResourceItem;