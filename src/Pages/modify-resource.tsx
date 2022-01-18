import React, { useState } from 'react';

import '../Styles/pages/modify.css'
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Components/header'
import { ResourceForm } from '../Components/resource-form';
import When from '../Components/when';
import { LoadingSpinnerWithTitle } from '../Components/loading-spinner-w-title';

function ModifyResource() {
  const updateResource = () => {}
  const [isLoading, setIsLoading] = useState(false)
  const [isModal, setModal] = useState(true)

  // TODO: mandar para página de erro qnd falhar
  // TODO: mostrar página de sucesso quando for publicado
  return (
    <div className="modify-content">
      <Header></Header>
      <main>
        <When expr={!isLoading}>
          // TODO: ajustar formulário de edição
          {/* <ResourceForm defaultValues={} submit={updateResource}/> */}
        </When>
        <When expr={isLoading}>
          <LoadingSpinnerWithTitle title="Publicando seu recurso"/>
        </When>
      </main>
    </div>
  );
}

export default ModifyResource;
