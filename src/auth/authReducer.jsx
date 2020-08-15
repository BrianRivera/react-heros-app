const { types } = require("../types/types");

const state = {
    name: 'Brina',
    logged: true
}

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged:true
            }
        
            case types.logaut:
                return {
                    logged: false
                }
    
        default:
            return state;
            break;
    }
    
}
