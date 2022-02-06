import React, {useContext}  from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

export const PrivateRoute = ({component: Component, ...rest})=>{
    const { isLogged } = useContext(UserContext);

    return (
        <Route
        {...rest}
        render={props=> 
            isLogged  ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }} />
            )
        }
        />
    )
};