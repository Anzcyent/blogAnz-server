import { appConstants } from "../constants";
import { postRequest, getRequest, deleteRequest } from "../../Utils/Fetch/fetchData";
import { getArticleById } from "./articles";

export const createComment = (id, data, token) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await postRequest(`comment/create/${id}`, data, token);

        dispatch(getArticleById(id));

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        });
    } catch (err) {
        dispatch({type: appConstants.ERROR, payload: err.response.data.message});
        throw new Error(err.response.data.message);
    }
}

export const voteComment = (id, token) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await getRequest(`comment/vote/${id}`, token);

        dispatch(getArticleById(res.data.data.article));

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        });
    } catch (err) {
        dispatch({type: appConstants.IS_LOADING, payload: false})
        dispatch({type: appConstants.ERROR, payload: err.response.data.message});
        throw new Error(err.response.data.message);
    }
}

export const deleteComment = (id, token) => async (dispatch) => {
    try {
        dispatch({
            type: appConstants.IS_LOADING,
            payload: true
        });

        const res = await deleteRequest(`comment/delete/${id}`, token);

        dispatch(getArticleById(res.data.data.article));

        dispatch({
            type: appConstants.IS_LOADING,
            payload: false
        });
    } catch (err) {
        dispatch({type: appConstants.ERROR, payload: err.response.data.message});
        throw new Error(err.response.data.message);
    }

}