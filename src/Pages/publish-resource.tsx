import React, { useState } from 'react';
import ContentLoader from 'styled-content-loader';

import '../Styles/pages/publish.css';

import Header from '../Components/header';
import { ResourceForm } from '../Components/resource-form';

function PublishResource() {
  const [isLoading, setIsLoading] = useState(false)
  const [modalOn, setModal] = useState(false)

  return (
    <div className="publish-content">
      <Header></Header>
        <main>
          {!modalOn ? (
            <ResourceForm setIsLoading={setIsLoading} setModal={setModal}/>
          ): (
            <ContentLoader isLoading={isLoading}>
              <h2 style={{color: "var(--gray-strong)", fontSize: 18, fontWeight: 'normal'}}>Publicado com sucesso</h2>
            </ContentLoader>
          )}
        </main>
    </div>
  );
}

export default PublishResource;
