import '@testing-library/jest-dom';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en AppRouter', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged:false
        }
    }

    test('debe de mostrar el login si no esta autenticado', () => {
        

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
            <AppRouter></AppRouter>
            </AuthContext.Provider>
            )
            expect(wrapper).toMatchSnapshot();

    });

    test('should debe mostrar el componente de marvel si esta autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged:true,
                name:'brian'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
            <AppRouter></AppRouter>
            </AuthContext.Provider>
            )
            expect(wrapper.find('.navbar').exists()).toMatchSnapshot();
            
    })
    
    
    
})
