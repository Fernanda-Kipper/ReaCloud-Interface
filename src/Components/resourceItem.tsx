import React, { useState } from 'react';

import '../Styles/components/resourceItem.css'

interface ResourceItemProps{
    title: string,
    last_modification: string,
    id: number
}

const ResourceItem: React.FunctionComponent< ResourceItemProps > = ({title,last_modification,id, ...rest}) => {
    const [submenuActivated, setSubmenuActivated] = useState(false)
    const [submenuClassName, setSubmenuClassname] = useState('Noactivated')

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
        return(
        <li className="Recurso">
            <ul>
                <li><h6 onClick={handleActivation}>...</h6>
                    <ul className={submenuClassName}>
                        <li><a href={`/editResource/${id}`}>Editar</a></li>
                        <li><a href={`/deleteResource/${id}`}>Excluir</a></li>
                   </ul>
                </li>
            </ul>
            <a href={`/resource/${id}`}>{ title }</a>
            <p className='data'>Última modificação: { last_modification }</p>
        </li>
    )
}

export default ResourceItem;