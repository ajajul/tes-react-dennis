import axios from "axios";
import * as actionType from "../variables/actionTypes";
import { API_URL_BASE } from "../variables/constants";
import { common } from "../utils/common";

export const userLogin = (data) => {
    const commonObj = new common();
    return (dispatch) => {
        dispatch({ type: actionType.WAITING_REQUEST, value: true });
        axios
        .post(`${API_URL_BASE}/auth/login`, data)
        .then((response) => {
            commonObj.handleServerSuccess(response, dispatch, actionType.USER_LOGIN_SUCCESS);
        })
        .catch((err) => {
            commonObj.handleServerError(err, dispatch, actionType.USER_LOGIN_ERROR);
        });
    };
};
