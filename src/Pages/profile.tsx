import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Avatar from 'react-avatar';

import '../Styles/pages/profile.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Components/header';
import { SaveButton } from '../Components/save-button';
import { ControlledSelect } from '../Components/form/controlled/select';

import profileOptions from '../Constants/profile-options';
import { useUser } from '../hooks/useUser';
import { useUserMutation } from '../hooks/useUserMutation';
import { useHistory } from 'react-router';
import { LoadingSpinnerWithTitle } from '../Components/loading-spinner-w-title';
import When from '../Components/when';
import { ControlledCheckboxGroup } from '../Components/form/controlled/checkbox-group';
import subjects from '../Constants/subjects';

function ProfilePage() {
    const { data, isLoading, isError } = useUser();
    const [preferences, setPreferences] = useState<string[]>([])
    const { mutateProfile, isError: isMutateError, isSuccess } = useUserMutation();
    const { control, setValue, handleSubmit } = useForm();
    const { push } = useHistory();

    const onSubmit = handleSubmit((values) => {
        mutateProfile({ ...values, preferences })
    })

    useEffect(()=>{
        if(!isError) return 
        toast.error('Erro ao procurar pelo seu perfil')
    }, [isError])

    useEffect(() => {
        if(!isMutateError) return
        push('/erro')
    }, [isMutateError, push])

    useEffect(() => {
        if(!isSuccess) return
        push('/sucesso')
    }, [isSuccess, push])

    useEffect(() => {
        if(!data) return 
        setValue('profile', data.profile)
        setPreferences(data.preferences ?? [])
    }, [data, setValue])

    return (
        <div className="profile-content">
            <Header></Header>
            <main>
                <When expr={isLoading}>
                    <LoadingSpinnerWithTitle title="Carregando seu perfil"/>
                </When>
                <When expr={data}>
                    <When expr={!data?.preferences || !data?.profile}>
                        <h2>Complete as informações do seu perfil para aproveitar ao máximo a ferramenta!</h2>
                    </When>
                    <form onSubmit={onSubmit}>
                        {data?.picture_url 
                            ? <img src={data?.picture_url} alt="Sua foto de perfil"/>
                            : <Avatar name={data?.name} size="100%" style={{width: '300px', height: '150px'}}/>
                        }
                        <p>{data?.name}</p>
                        <ControlledSelect
                            control={control}
                            name='profile'
                            defaultValue={data?.profile}
                            isRequired
                            label="Perfil acadêmico"
                            options={profileOptions}
                        />
                        <ControlledCheckboxGroup
                            setValues={setPreferences}
                            defaultValues={preferences}
                            label="Matérias de preferência"
                            options={subjects}
                        />
                        <SaveButton label="Salvar"/>
                    </form>
                </When>
            </main>
        </div>
    );
}

export default ProfilePage;
