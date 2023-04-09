import { authConstants } from "../constants";

const initialState = {
    user: {},
    token: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.AUTH:
            return {
                ...state,
                user: action.payload.data,
                token: action.payload.access_token
            }

        default:
            return state;
    }
}


export default authReducer