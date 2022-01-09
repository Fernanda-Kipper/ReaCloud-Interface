import React, { useState } from 'react';

import '../Styles/pages/publish.css';

import Header from '../Components/header';
import { ResourceForm } from '../Components/resource-form';
import When from '../Components/when';
import { LoadingSpinnerWithTitle } from '../Components/loading-spinner-w-title';

function PublishResource() {
  const [isLoading, setIsLoading] = useState(false)
  const [modalOn, setModal] = useState(false)

  return (
    <div className="publish-content">
      <Header></Header>
        <main>
          <When expr={!isLoading}>
            <ResourceForm setIsLoading={setIsLoading} setModal={setModal}/>
          </When>
          <When expr={isLoading}>
            <LoadingSpinnerWithTitle title="Publicando seu recurso"/>
          </When>
        </main>
    </div>
  );
}

export default PublishResource;
