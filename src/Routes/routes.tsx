import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';

import HomePage from '../Pages/home'
import LoginPage from '../Pages/login';
import PublishResource from '../Pages/publishResource'
import SignInPage from '../Pages/signIn';
import ProfilePage from '../Pages/profile';
import ResourcePage from '../Pages/resource';

import {PrivateRoute} from './privateRoutes'

import UserContextProvider from '../AuthContext/ContextProvider'

function Routes(){
    return(
        <BrowserRouter>
            <UserContextProvider>
                <Switch>
                    <Route path='/' exact component={HomePage}/>
                    <Route path='/login' exact component={LoginPage}/>
                    <Route path='/signIn' exact component={SignInPage}/>
                    <Route path='/resource/:id' exact component={ResourcePage}/>
                    <PrivateRoute path='/publicarRecurso' exact component={PublishResource}/>
                    <PrivateRoute path='/profile' exact component={ProfilePage}/>
                </Switch>
            </UserContextProvider>
        </BrowserRouter>
    );
}

export default Routes;