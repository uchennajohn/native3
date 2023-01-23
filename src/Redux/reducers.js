import {SET_USER_NAME, SET_USER_NUMBER} from './actions'

const initialState={
    name: " ",
    number: 0
}


function userReducer(state=initialState, action) {
    switch(action.type) {
        case SET_USER_NAME:
            return{...state, name: action.payload}
         case SET_USER_NUMBER:
            return{...state, number: action.payload}
        default: 
            return state;
    }
}


export default userReducer;