import React from 'react'

import '../Styles/pages/my-resources.css'

import ResourceItem from '../Components/resource-item'
import { Resource } from '../Interfaces/resource'
import Header from '../Components/header'
import { useUserResources } from '../hooks/useUserResources'
import When from '../Components/when'
import { LoadingSpinnerWithTitle } from '../Components/loading-spinner-w-title'

export default function MyResources(){
  const { data: resources, isLoading } = useUserResources()

  return(
    <div className='my-resources-content'>
      <Header />
      <main>
        <p className="description">Aqui estão todos os recursos que você compartilhou no repositório</p>
        <ul className="resources">
          <When expr={resources}>
            {resources?.map((item: Resource)=>{
                return(
                  <ResourceItem 
                    title={item.title} 
                    last_modification={item.last_modification} 
                    id={item.id}
                    key={item.id}>
                  </ResourceItem>
                )
            })}
          </When>
          <When expr={isLoading}>
            <LoadingSpinnerWithTitle title="Buscando recursos"/>
          </When>
        </ul>
      </main>
    </div>
  )
}