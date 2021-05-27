import axios from 'axios';
import * as actionType from "../variables/actionTypes";
import { API_URL_BASE } from '../variables/constants';
import { common } from '../utils/common';


export const getJobsList = (token, currentPage='1', pageSize='5000', searchQuery='', fromDate='', todate='') => {
    const commonObj = new common();

    return (dispatch) => {
        dispatch({ type: actionType.WAITING_REQUEST, value: true });
        axios.get(
            `${API_URL_BASE}/job?currentPage=${currentPage}&pageSize=${pageSize}&searchQuery=${searchQuery}&fromDate=${fromDate}&toDate=${todate}`, 
            { headers: {"Authorization" : `${token}`} })
            .then((response) => {
                commonObj.handleServerSucess(response, dispatch, actionType.GET_JOB_LIST_SUCCESS);
            })
            .catch((err) => {
                commonObj.handleServerError(err, dispatch, actionType.GET_JOB_LIST_ERROR);
            });
    }
}
