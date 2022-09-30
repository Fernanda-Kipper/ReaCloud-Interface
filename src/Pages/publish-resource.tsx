import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../Styles/pages/publish.css';

import Header from '../Components/header';
import { ResourceForm } from '../Components/resource-form';
import When from '../Components/when';
import { LoadingSpinnerWithTitle } from '../Components/loading-spinner-w-title';
import { useResourceMutation } from '../hooks/useResourceMutation';
import { ExtensionParamContext } from '../Context/ExtensionParamContext';
import { generateResource } from '../Utils/generate-resource';

function PublishResource() {
  const { postResource, isLoading, isError, isSuccess } = useResourceMutation()
  const { pluginData } = useContext(ExtensionParamContext)
  const { push } = useHistory()

  const defaultValues = {
    external_url: pluginData?.link ?? '', 
    title: pluginData?.title ?? '',
    description: pluginData?.description ?? '',
    author: pluginData?.channel ?? '',
    type: pluginData?.videoTitle ? 'video' : '',
    video: pluginData?.videoTitle ? pluginData?.link : ''
  }

  useEffect(() => {
    if(!isError) return 
    push('/erro')
  }, [isError, push])

  useEffect(() => {
    if(!isSuccess) return 
    push('/sucesso')
  }, [isSuccess, push])

  return (
    <div className="publish-content">
      <Header></Header>
        <main>
          <When expr={!isLoading}>
            <ResourceForm submit={postResource} defaultValues={generateResource(defaultValues)}/>
          </When>
          <When expr={isLoading}>
            <LoadingSpinnerWithTitle title="Publicando seu recurso"/>
          </When>
        </main>
    </div>
  );
}

export default PublishResource;
