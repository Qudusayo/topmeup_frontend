import { SET_AUTH, REMOVE_AUTH, GET_USER_INFO } from "../actions/types";

const initialState = {
    auth: false,
    userInfo: {
        userName: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
    },
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
        default:
            return state;
    }
}
