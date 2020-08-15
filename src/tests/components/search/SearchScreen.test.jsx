import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('pruebas en seachj', () => {

    test('Debe de hacer match', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen}/>
            </MemoryRouter>
        )
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');

    });

    test('debem de mostrar a batman y el input con el valor del queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen}/>
            </MemoryRouter>
        )
        
        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de mostrar un error si no se encuantra el hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=dasdasdadsasdds']}>
                <Route path="/search" component={SearchScreen}/>
            </MemoryRouter>
        )

        expect(wrapper.find('.alert-danger').text().trim()).toBe('no se a encontrado el heroe dasdasdadsasdds');
        expect(wrapper).toMatchSnapshot();
    });
    
    test('debe de llamar el push del history ', () => {

        const history = {
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route 
                path="/search" 
                component={() => <SearchScreen history={history}></SearchScreen>}/>
            </MemoryRouter>
        )
        wrapper.find('input').simulate('change',{
            target: {
                name: 'busqueda',
                value: 'batman'
            }
        });
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })
        
        expect(history.push).toHaveBeenCalledWith(`?q=batman`);
    })
    
    
    
    
})
