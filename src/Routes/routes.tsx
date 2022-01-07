import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from '../Pages/home'
import LoginPage from '../Pages/login';
import PublishResource from '../Pages/publish-resource';
import SignInPage from '../Pages/signIn';
import ProfilePage from '../Pages/profile';
import ResourcePage from '../Pages/resource';
import ModifyResource from '../Pages/modify-resource';
import HelpPage from '../Pages/help';
import SearchPage from '../Pages/search';

import { PrivateRoute } from './privateRoutes';
import { SetupGtm } from '../Services/setup-gtm';

import { ExtensionParamProvider } from '../Context/ExtensionParamContext';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/entrar'>
                    <LoginPage/>
                </Route>
                <Route path='/ajuda'>
                    <HelpPage/>
                </Route>
                <Route path='/cadastrar'>
                    <SignInPage/>
                </Route>
                <Route path='/buscar'>
                    <SearchPage />
                </Route>
                <Route path='/recurso/:id'>
                    <ResourcePage/>
                </Route>
                <ExtensionParamProvider>
                    <PrivateRoute path='/publicar' component={PublishResource}/>
                    <PrivateRoute path='/perfil' component={ProfilePage}/>
                    <PrivateRoute path='/recurso/editar/:id' component={ModifyResource}/>
                </ExtensionParamProvider>
                <Route path='*'>
                    <HomePage/>
                </Route>
            </Switch>
            <SetupGtm/>
        </BrowserRouter>
    );
}

export default Routes;