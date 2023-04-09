import { appConstants } from "../constants";

const initailState = {
    responsive: window.innerWidth < 768 ? true : false,
    isLoading: false,
    searchLoading: false,
    error: ""
}


const appReducer = (state = initailState, action) => {
    switch (action.type) {
        case appConstants.SET_RESPONSIVE:
            return {
                ...state,
                responsive: action.payload
            };
        case appConstants.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case appConstants.SEARCH_LOADING:
            return {
                ...state,
                searchLoading: action.payload
            }
        case appConstants.ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default appReducer;