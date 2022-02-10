import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from '../Pages/home'
import LoginPage from '../Pages/login';
import PublishResource from '../Pages/publish-resource';
import OauthCallbackPage from '../Pages/auth';
import ProfilePage from '../Pages/profile';
import ResourcePage from '../Pages/resource';
import ModifyResource from '../Pages/modify-resource';
import HelpPage from '../Pages/help';
import SearchPage from '../Pages/search';
import ErrorPage from '../Pages/error';
import SuccessPage from '../Pages/success';
import MyResources from '../Pages/my-resources';
import PluginManager from '../Pages/plugin-manager';
import TermsOfUsePage from '../Pages/terms';

import { PrivateRoute } from './privateRoutes';

import { ExtensionParamProvider } from '../Context/ExtensionParamContext';
import { UserContextProvider } from '../Context/UserContext';
import { SetupGtm } from '../setupGtm';

function Routes(){
    return(
        <BrowserRouter>
            <SetupGtm />
            <UserContextProvider>
                <Switch>
                    <Route exact path='/entrar'>
                        <LoginPage/>
                    </Route>
                    <Route exact path='/ajuda'>
                        <HelpPage/>
                    </Route>
                    <Route exact path='/termo'>
                        <TermsOfUsePage />
                    </Route>
                    <Route exact path='/buscar'>
                        <SearchPage />
                    </Route>
                    <Route exact path='/recurso/:id'>
                        <ResourcePage/>
                    </Route>
                    <Route exact path='/erro'>
                        <ErrorPage/>
                    </Route>
                    <Route exact path='/sucesso'>
                        <SuccessPage/>
                    </Route>
                    <Route exact path='/'>
                        <HomePage/>
                    </Route>
                    <Route path='/auth'>
                        <OauthCallbackPage />
                    </Route>
                    <ExtensionParamProvider>
                        <PrivateRoute path='/publicar' component={PublishResource}/> */
                        <PrivateRoute path='/perfil' component={ProfilePage}/>
                        <PrivateRoute path='/recurso/editar/:id' component={ModifyResource}/>
                        <PrivateRoute path='/meus-recursos' component={MyResources} />
                        <PrivateRoute path='/plugin' component={PluginManager} />
                    </ExtensionParamProvider>
                </Switch>
            </UserContextProvider>
        </BrowserRouter>
    );
}

export default Routes;