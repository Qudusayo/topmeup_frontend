import axios from "axios";
import { SET_AUTH, REMOVE_AUTH, GET_USER_INFO, GET_TRANSACTION_HISTORY } from "./types";

export const authUser = (data) => (dispatch) => {
    dispatch({
        type: SET_AUTH,
        payload: true,
    });
};

export const revokeUser = (data) => (dispatch) => {
    dispatch({
        type: REMOVE_AUTH,
        payload: false,
    });
};

export const getUserInfo = () => (dispatch) => {
    const api = `${process.env.REACT_APP_BACKEND_URI}/getUserInfo`;
    const token = JSON.parse(sessionStorage.getItem('topuplab')).token
    axios
        .get(api, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            dispatch({
                type: GET_USER_INFO,
                payload: res.data,
            });
        });
};

export const getTransactionHistory = () => (dispatch) => {
    const api = `${process.env.REACT_APP_BACKEND_URI}/getHistory`;
    const token = JSON.parse(sessionStorage.getItem('topuplab')).token
    axios
        .get(api, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            dispatch({
                type: GET_TRANSACTION_HISTORY,
                payload: res.data,
            });
        });
};
