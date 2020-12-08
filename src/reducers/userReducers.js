import { SET_AUTH, REMOVE_AUTH, GET_USER_INFO, GET_TRANSACTION_HISTORY } from "../actions/types";

const initialState = {
    auth: false,
    userInfo: {
        userName: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
    },
    history: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                auth: action.payload,
            };
        case REMOVE_AUTH:
            return {
                ...state,
                auth: action.payload,
            };
        case GET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            };
        case GET_TRANSACTION_HISTORY:
            return {
                ...state,
                history: action.payload,
            };
        default:
            return state;
    }
}
