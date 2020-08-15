import '@testing-library/jest-dom'
import React from 'react';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../types/types';


describe('Pruebas en login', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged:true,
            name:'brian'
        }
    }

    const history = {
        replace: jest.fn()
    }

    const wrapper = mount(
    <AuthContext.Provider value = {contextValue}>
        <MemoryRouter>
            <LoginScreen history={history}>
            </LoginScreen>
        </MemoryRouter>
    </AuthContext.Provider>
    )



    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });


    test('debe de realizar el dispatch y la navegacion', () => {
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'brian 2'
            }
        });

        expect(history.replace).toHaveBeenCalledTimes(1);
        
        localStorage.setItem('lastPath','/dc');
        handleClick();
        expect(history.replace).toHaveBeenCalledWith('/dc')

    })
    
    

})
