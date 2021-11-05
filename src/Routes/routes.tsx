import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';

import HomePage from '../Pages/home'
import LoginPage from '../Pages/login';
import PublishResource from '../Pages/publish-resource';
import SignInPage from '../Pages/signIn';
import ProfilePage from '../Pages/profile';
import ResourcePage from '../Pages/resource';
import ModifyResource from '../Pages/modify-resource';
import HelpPage from '../Pages/help';
import SearchPage from '../Pages/search';
import NewsletterPage from '../Pages/newsletter';

import { PrivateRoute } from './privateRoutes';
import { SetupGtm } from '../Services/setup-gtm';

import { UserContextProvider } from '../Context/UserContext';
import { ExtensionParamProvider } from '../Context/ExtensionParamContext';

function Routes(){
    return(
        <BrowserRouter>
            <UserContextProvider>
                <Switch>
                    <Route path="/" exact component={NewsletterPage}/>
                    <Route path='/entrar' exact component={LoginPage}/>
                    <Route path='/ajuda' exact component={HelpPage}/>
                    <ExtensionParamProvider>
                        <PrivateRoute path='/publicar' exact component={PublishResource}/>
                        <PrivateRoute path='/perfil' exact component={ProfilePage}/>
                        <PrivateRoute path='/recurso/editar/:id' exact component={ModifyResource}/>
                        <PrivateRoute path='/inicial' exact component={HomePage}/>
                        <PrivateRoute path='/cadastrar' exact component={SignInPage}/>
                        <PrivateRoute path='/buscar' exact component={SearchPage}/>
                        <PrivateRoute path='/recurso/:id' exact component={ResourcePage}/>
                    </ExtensionParamProvider>
                </Switch>
            </UserContextProvider>
            <SetupGtm/>
        </BrowserRouter>
    );
}

export default Routes;