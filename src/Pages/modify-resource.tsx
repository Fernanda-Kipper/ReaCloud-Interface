import React, { useState } from 'react';

import '../Styles/pages/modify.css'
import 'react-toastify/dist/ReactToastify.css';

import ContentLoader from 'styled-content-loader'
import Header from '../Components/header'
import { ResourceForm } from '../Components/resource-form';

function ModifyResource() {
  const [isLoading, setIsLoading] = useState(false)
  const [isModal, setModal] = useState(true)

  return (
    <div className="modify-content">
      <Header></Header>
      <main>
        {isModal ? (
          <ResourceForm setIsLoading={setIsLoading} setModal={setModal} isEdit/>
        )  : (
          <ContentLoader isLoading={isLoading}>
            <h2 style={{color: "var(--gray-strong)", fontSize: 18, fontWeight: 'normal'}}>Alterado com sucesso</h2>
          </ContentLoader>
        )
        }
      </main>
    </div>
  );
}

export default ModifyResource;
