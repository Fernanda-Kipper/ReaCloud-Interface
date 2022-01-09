import React, { useState } from 'react';

import '../Styles/pages/modify.css'
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Components/header'
import { ResourceForm } from '../Components/resource-form';
import When from '../Components/when';
import { LoadingSpinnerWithTitle } from '../Components/loading-spinner-w-title';

function ModifyResource() {
  const [isLoading, setIsLoading] = useState(false)
  const [isModal, setModal] = useState(true)

  return (
    <div className="modify-content">
      <Header></Header>
      <main>
        <When expr={!isLoading}>
          <ResourceForm setIsLoading={setIsLoading} setModal={setModal} isEdit/>
        </When>
        <When expr={isLoading}>
          <LoadingSpinnerWithTitle title="Publicando seu recurso"/>
        </When>
      </main>
    </div>
  );
}

export default ModifyResource;
