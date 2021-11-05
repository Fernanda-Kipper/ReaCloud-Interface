import React, {useContext}  from 'react'
import {Redirect, Route} from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

export const PrivateRoute = ({component: Component, ...rest})=>{
    const { value, name } = useContext(UserContext);
    const isAdmin = name === 'admin'

    return (
        <Route
        {...rest}
        render={props=> 
            value && isAdmin ? (
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