import * as actionType from "../variables/actionTypes";

const initialState = {
    waiting: false,
    jobList: [],
    success: true,
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
                waiting: action.value
            };
        case actionType.GET_JOB_LIST_SUCCESS:
            return {
                ...state,
                success: true,
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
                success: false,
                error: action.errorMessage,
            };
        default:
            return state
    }
}

export default userReducer;