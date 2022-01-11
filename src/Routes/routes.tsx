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
import { UserContextProvider } from '../Context/UserContext';

function Routes(){
    return(
        <BrowserRouter>
            <UserContextProvider>
                <Switch>
                    <Route exact path='/entrar'>
                        <LoginPage/>
                    </Route>
                    <Route exact path='/ajuda'>
                        <HelpPage/>
                    </Route>
                    <Route exact path='/cadastrar'>
                        <SignInPage/>
                    </Route>
                    <Route exact path='/buscar'>
                        <SearchPage />
                    </Route>
                    <Route exact path='/recurso/:id'>
                        <ResourcePage/>
                    </Route>
                    <Route exact path='/'>
                        <HomePage/>
                    </Route>
                    <ExtensionParamProvider>
                        <PrivateRoute path='/publicar' component={PublishResource}/> */
                        <PrivateRoute path='/perfil' component={ProfilePage}/>
                        <PrivateRoute path='/recurso/editar/:id' component={ModifyResource}/>
                    </ExtensionParamProvider>
                </Switch>
                <SetupGtm/>
            </UserContextProvider>
        </BrowserRouter>
    );
}

export default Routes;