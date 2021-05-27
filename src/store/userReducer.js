import * as actionType from "../variables/actionTypes";

const initialState = {
    waiting: false,
    token: null,
    sucess: true,
    error: null,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.WAITING_REQUEST:
            return {
                ...state,
                sucess: false,
                error: null,
                waiting: true
            };
        case actionType.USER_LOGIN_SUCCESS:
            return {
                ...state,
                sucess: true,
                error: null,
                token: action.responseData
            };
        case actionType.USER_LOGIN_ERROR:
            return {
                ...state,
                token: null,
                sucess: false,
                error: action.errorMessage,
            };

        case actionType.USER_LOGOUT:
            return {
                ...state,
                token: null,
                sucess: false,
                error: null,
            };
        default:
            return state
    }
}

export default userReducer;