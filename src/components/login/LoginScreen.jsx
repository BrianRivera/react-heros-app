import React, { useContext } from 'react'
import { authReducer } from '../../auth/authReducer'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({history}) => {
    
    //dispatch es una propedad del context
    const {dispatch} = useContext(AuthContext);
    
    
    const handleLogin = ()=>{

        const lastpath = localStorage.getItem('lastPath') || '/';

        dispatch({
            type: types.login,
            payload: {
                name: 'brian 2'
            }
        });
        history.replace(lastpath);   
    }

    return (
        <div className="container mt-5">
            <h1>login</h1>
            <hr/>

            <button
            className="btn btn-primary"
            onClick={handleLogin}
            >
                login
            </button>
        </div>
    )
}
