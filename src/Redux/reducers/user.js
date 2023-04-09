import { userConstants } from "../constants";

const initialState = {
    users: [],
    current_user: {}
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.GET_USER:

            return {
                ...state,
                current_user: action.payload
            };

        default:
            return state;
    }
}

export default userReducer;