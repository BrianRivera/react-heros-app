import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { HeroesScreen } from '../../../components/heroes/HeroesScreen';
import { MemoryRouter, Route } from 'react-router-dom';


describe('Pruebas en HeroesScreen', () => {


    const history = {
        lenght: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    
    test('Debe de mostrar el componente redirect  si no hay argumentos en el url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
            <HeroesScreen history = {history}></HeroesScreen>
            </MemoryRouter>
        );
        
        expect(wrapper.find('Redirect').exists()).toBe(true);
        
    });

    test('Debe de mostrar uun hero si existe el parametro', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Route path="/hero/:heroeId" component={HeroesScreen}>
                </Route>
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);

        
    })

    test('debe regresar a la pantalla anterior con PUSH', () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Route
                path="/hero/:heroeId"
                component={()=> <HeroesScreen history={history}></HeroesScreen>}>
                </Route>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();


    });

    test('debe regresar a la pantalla anterior GOBACK', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Route
                path="/hero/:heroeId"
                component={()=> <HeroesScreen history={history}></HeroesScreen>}>
                </Route>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledTimes(0);
        expect(history.goBack).toHaveBeenCalled();


    })


    test('debe llamar al redirect is el heroe no existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-ironsdfsdfsf']}>
                <Route
                path="/hero/:heroeId"
                component={()=> <HeroesScreen history={history}></HeroesScreen>}>
                </Route>
            </MemoryRouter>
        );


        expect(wrapper.text()).toBe('')


    })
    
    
    

    
})
