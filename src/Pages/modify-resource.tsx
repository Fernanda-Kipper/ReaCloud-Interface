import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';

import '../Styles/pages/modify.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Components/header';
import { ResourceForm } from '../Components/resource-form';
import When from '../Components/when';
import { LoadingSpinnerWithTitle } from '../Components/loading-spinner-w-title';
import { useResource } from '../hooks/useResource';
import { usePutResource } from '../hooks/usePutResource'
import ParameterPassedToUrl from '../Interfaces/parameter-id';

function ModifyResource() {
  const paramsUrl: ParameterPassedToUrl = useParams();
  const { data, isError: dataError, isLoading: dataLoading } = useResource(paramsUrl.id)
  const { putResource, isError: putError, isLoading: putLoading, isSuccess } = usePutResource()
  const { push } = useHistory()

  useEffect(() => {
    if(!putError && !dataError) return 
    push('/erro')
  }, [putError, dataError, push])

  useEffect(() => {
    if(!isSuccess) return 
    push('/sucesso')
  }, [isSuccess, push])

  const onSubmit = (data: FormData) => {
    putResource(data, paramsUrl.id)
  }

  return (
    <div className="modify-content">
      <Header></Header>
      <main>
        <When expr={!dataLoading && !putLoading}>
          <ResourceForm defaultValues={data} submit={onSubmit}/>
        </When>
        <When expr={dataLoading}>
          <LoadingSpinnerWithTitle title="Carregando dados do recurso"/>
        </When>
        <When expr={putLoading}>
          <LoadingSpinnerWithTitle title="Atualizando o recurso"/>
        </When>
      </main>
    </div>
  );
}

export default ModifyResource;
