import axios from "axios";
import Cookies from 'js-cookie';
import {
    SET_AUTH,
    REMOVE_AUTH,
    GET_USER_INFO,
    GET_TRANSACTION_HISTORY,
    GET_DATA_SUBSCRIPTION,
    GET_TV_SUBSCRIPTION,
} from "./types";

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
    const token = Cookies.get('_lab__topup');
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
    const token = Cookies.get('_lab__topup');
    axios
        .get(api, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            dispatch({
                type: GET_TRANSACTION_HISTORY,
                payload: res.data,
            });
        });
};

export const getDataSubscription = () => (dispatch) => {
    const api = `${process.env.REACT_APP_BACKEND_URI}/getInfo/dataSubscriptions`;
    const token = Cookies.get('_lab__topup');
    axios
        .get(api, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            dispatch({
                type: GET_DATA_SUBSCRIPTION,
                payload: res.data,
            });
        });
};

export const getTvSubscription = () => (dispatch) => {
    const api = `${process.env.REACT_APP_BACKEND_URI}/getInfo/tvSubscriptions`;
    const token = Cookies.get('_lab__topup');
    axios
        .get(api, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            dispatch({
                type: GET_TV_SUBSCRIPTION,
                payload: res.data,
            });
        });
};
