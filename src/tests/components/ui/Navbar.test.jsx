import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';



describe('pruebas en navbar', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged:true,
            name:'brian'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Router history = {historyMock}>
                     <Navbar></Navbar>
                   </Router>
                </MemoryRouter>
            </AuthContext.Provider>
    )

    afterEach(()=>{
        jest.clearAllMocks();
    })


    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('brian')
    });

    test('debe de llamar el logout y usar el history', () => {
        
        //simulando click del button  tambien s epuede hacer consumulate
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type:types.logaut
        });

        expect(historyMock.replace).toHaveBeenCalledWith('/login');

    })
    
    
    
})
