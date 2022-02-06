import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Avatar from 'react-avatar';

import '../Styles/pages/profile.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Components/header';
import { TextInput } from '../Components/form/text-input';
import { SaveButton } from '../Components/save-button';
import { ControlledInputText } from '../Components/form/controlled/text-input';
import { ControlledSelect } from '../Components/form/controlled/select';

import profileOptions from '../Constants/profile-options';
import { useUser } from '../hooks/useUser';
import { useUserMutation } from '../hooks/useUserMutation';
import { useHistory } from 'react-router';
import { LoadingSpinnerWithTitle } from '../Components/loading-spinner-w-title';
import When from '../Components/when';

function ProfilePage() {
    const { data, isLoading, isError } = useUser();
    const { mutateProfile, isError: isMutateError, isSuccess } = useUserMutation();
    const { control, setValue, handleSubmit } = useForm();
    const { push } = useHistory();

    const onSubmit = handleSubmit((values) => {
        mutateProfile(values)
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
        setValue('name', data.name)
        setValue('profile', data.profile)
        setValue('picture_url', data.picture_url)
        setValue('email', data.email)
    }, [data, setValue])

    return (
        <div className="profile-content">
            <Header></Header>
            <main>
                <When expr={isLoading}>
                    <LoadingSpinnerWithTitle title="Carregando seu perfil"/>
                </When>
                <When expr={data}>
                    <form onSubmit={onSubmit}>
                        {data?.picture_url 
                            ? <img src={data?.picture_url} alt="Sua foto de perfil"/>
                            : <Avatar name={data?.name} size="100%" style={{width: '300px', height: '150px'}}/>
                        }
                        <ControlledInputText 
                            control={control}
                            name='picture_url'
                            defaultValue={data?.picture_url}
                            label="URL para sua foto"
                        />
                        <TextInput 
                            name='email'
                            value={data?.email ?? ''}
                            label="Seu e-mail"
                            isDisabled
                        />
                        <ControlledInputText 
                            control={control}
                            name='name'
                            defaultValue={data?.name}
                            isRequired
                            label="Nome completo"
                        />
                        <ControlledSelect
                            control={control}
                            name='profile'
                            defaultValue={data?.profile}
                            isRequired
                            label="Perfil acadêmico"
                            options={profileOptions}
                        />
                        <SaveButton label="Salvar"/>
                    </form>
                </When>
            </main>
        </div>
    );
}

export default ProfilePage;
