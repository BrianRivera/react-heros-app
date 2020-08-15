import '@testing-library/jest-dom';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en PrivateRoute', () => {
    
    const props = {
        location: {
            pathname: '/marvel'
        }
    } 

    Storage.prototype.setItem = jest.fn();
    
    test('debe de mostrar el componente si esta autenticado y guardar el localStorage', () => {

        //MemoryRouter se usa para hace rpruebas con cuertas rutas
        const wrapper = mount(
            <MemoryRouter>
            <PrivateRoute
            isAutenticated={true}
            component={() => <span>Listo!</span>}
            {...props}
            >
            </PrivateRoute>
            </MemoryRouter>
        )

        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel')
    })

    test('should ', () => {
        const wrapper = mount(
            <MemoryRouter>
            <PrivateRoute
            isAutenticated={false}
            component={() => <span>Listo!</span>}
            {...props}
            >
            </PrivateRoute>
            </MemoryRouter>
        )

        expect(wrapper.find('span').exists()).toBe(false);
    })
    
    
})

