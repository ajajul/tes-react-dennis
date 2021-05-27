import axios from "axios";
import * as actionType from "../variables/actionTypes";
import { API_URL_BASE } from "../variables/constants";
import { common } from "../utils/common";

export const getJobsList = (
    token,
    currentPage = "1",
    pageSize = "5000",
    searchQuery = "",
    fromDate = "",
    todate = "",
    SortColumn = "",
    SortDir=""
) => {
    const commonObj = new common();

    return (dispatch) => {
        dispatch({ type: actionType.WAITING_REQUEST, value: true });
        let url = `${API_URL_BASE}/job?currentPage=${currentPage}&pageSize=${pageSize}&searchQuery=${searchQuery}&fromDate=${fromDate}&toDate=${todate}`;
        if (SortColumn !== "") {
            url += `&SortColumn=${SortColumn}`;
        }
        if (SortDir !== "") {
            url += `&SortDir=${SortDir}`;
        }
        axios
        .get(
            url,
            { headers: { Authorization: `${token}` } }
        )
        .then((response) => {
            commonObj.handleServerSuccess(response, dispatch, actionType.GET_JOB_LIST_SUCCESS);
        })
        .catch((err) => {
            commonObj.handleServerError(err, dispatch, actionType.GET_JOB_LIST_ERROR);
        });
    };
};
