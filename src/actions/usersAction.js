import axios from "axios";
import { SET_AUTH, REMOVE_AUTH, GET_USER_INFO } from "./types";

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
    const api = `http://localhost:5000/getUserInfo`;
    const token = JSON.parse(sessionStorage.getItem('topuplab')).token
    axios
        .get(api, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: GET_USER_INFO,
                payload: res.data,
            });
        });
};
