import { appConstants, userConstants } from "../constants";
import { getRequest } from "../../Utils/Fetch/fetchData"

export const getUserById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await getRequest(`user/${id}`);

        dispatch({
            type: userConstants.GET_USER,
            payload: res.data.data
        });

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        });

    } catch (err) {
        dispatch({type: appConstants.ERROR, payload: err.response.data.message});
        throw new Error(err.response.data.message);
    }
}