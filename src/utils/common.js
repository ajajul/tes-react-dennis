import {
    WAITING_REQUEST
} from '../variables/actionTypes';

export class common {

    handleServerSucess = (response, dispatch, constantName) => {
        dispatch({ type: constantName, responseData: response.data });
        dispatch({ type: WAITING_REQUEST, value: false });
    }

    handleServerError = (err, dispatch, constantName) => {
        if (typeof err.response === 'undefined') {
            dispatch({ type: constantName, errorMessage: 'Network error!' });
        }
        else {
            if (err.response.status === 500) {
                dispatch({ type: constantName, errorMessage: 'Internal server error!' });
            }
            else {
                dispatch({ type: constantName, errorMessage: err.response.data })
            }
        }

        dispatch({ type: WAITING_REQUEST, value: false });
    }
}