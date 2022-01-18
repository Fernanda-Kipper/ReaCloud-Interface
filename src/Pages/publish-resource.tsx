import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../Styles/pages/publish.css';

import Header from '../Components/header';
import { ResourceForm } from '../Components/resource-form';
import When from '../Components/when';
import { LoadingSpinnerWithTitle } from '../Components/loading-spinner-w-title';
import { useResourceMutation } from '../hooks/useResourceMutation';

function PublishResource() {
  const { postResource, isLoading, isError } = useResourceMutation()
  const { push } = useHistory()

  useEffect(() => {
    if(!isError) return 

    push('/erro')
  }, [isError])

  return (
    <div className="publish-content">
      <Header></Header>
        <main>
          <When expr={!isLoading}>
            <ResourceForm submit={postResource}/>
          </When>
          <When expr={isLoading}>
            <LoadingSpinnerWithTitle title="Publicando seu recurso"/>
          </When>
        </main>
    </div>
  );
}

export default PublishResource;
