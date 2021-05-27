import * as actionType from "../variables/actionTypes";

const initialState = {
    waiting: false,
    token: null,
    success: true,
    error: null,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.WAITING_REQUEST:
            return {
                ...state,
                waiting: action.value
            };
        case actionType.USER_LOGIN_SUCCESS:
            return {
                ...state,
                success: true,
                error: null,
                token: action.responseData
            };
        case actionType.USER_LOGIN_ERROR:
            return {
                ...state,
                token: null,
                success: false,
                error: action.errorMessage,
            };

        case actionType.USER_LOGOUT:
            return {
                ...state,
                token: null,
                success: false,
                error: null,
            };
        default:
            return state
    }
}

export default userReducer;