import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';

import HomePage from '../Pages/home'
import LoginPage from '../Pages/login';
import PublishResource from '../Pages/publishResource'
import SignInPage from '../Pages/signIn'
import ProfilePage from '../Pages/profile'
import ResourcePage from '../Pages/resource'
import ModifyResource from '../Pages/modifyResource'
import HelpPage from '../Pages/helpHostYourRea'
import SearchPage from '../Pages/search'

import {PrivateRoute} from './privateRoutes'

import {UserContextProvider} from '../AuthContext/UserContext'

function Routes(){
    return(
        <BrowserRouter>
            <UserContextProvider>
                <Switch>
                    <Route path='/' exact component={HomePage}/>
                    <Route path='/entrar' exact component={LoginPage}/>
                    <Route path='/cadastrar' exact component={SignInPage}/>
                    <Route path='/buscar' exact component={SearchPage}/>
                    <Route path='/recurso/:id' exact component={ResourcePage}/>
                    <Route path='/ajuda' exact component={HelpPage}/>
                    <PrivateRoute path='/publicar' exact component={PublishResource}/>
                    <PrivateRoute path='/perfil' exact component={ProfilePage}/>
                    <PrivateRoute path='/recurso/editar/:id' exact component={ModifyResource}/>
                </Switch>
            </UserContextProvider>
        </BrowserRouter>
    );
}

export default Routes;