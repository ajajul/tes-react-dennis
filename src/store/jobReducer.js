import * as actionType from "../variables/actionTypes";

const initialState = {
    waiting: false,
    jobList: [],
    sucess: true,
    error: null,
    recordsTotal: 0,
    recordsFiltered: 0,
    total: 0,
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
        case actionType.GET_JOB_LIST_SUCCESS:
            return {
                ...state,
                sucess: true,
                error: null,
                jobList: action.responseData.data,
                recordsTotal: action.responseData.recordsTotal,
                recordsFiltered: action.responseData.recordsFiltered,
                total: action.responseData.total
            };
        case actionType.GET_JOB_LIST_ERROR:
            return {
                ...state,
                jobList: [],
                sucess: false,
                error: action.errorMessage,
            };
        default:
            return state
    }
}

export default userReducer;