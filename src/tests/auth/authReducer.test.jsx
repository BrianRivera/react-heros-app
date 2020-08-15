import '@testing-library/jest-dom';
import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';


describe('Pruebas en authReducer', () => {

    
    test('debe de retornar elestado por defecto ', () => {
        
        const state = authReducer({logged:false}, {});
        expect(state).toEqual({logged:false});
        
    });
    test('debe de autenticar y colocar el name del usuario ',() => {
        const state = authReducer({}, {type:types.login,payload:{
            logged: true,
            name: 'Brina'
        }});

        expect(state).toEqual({
            name: 'Brina',
            logged: true
        });
    })

    test('debe de borrar el name del usuario y logged en false ', () => {
        const action = {
            type: types.logaut
        }
        
        var state = authReducer({logged: true,name: 'Brina'},action)

        expect(state).toEqual({ logged: false});
    })
    
})
