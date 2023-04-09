import { appConstants } from "../constants"

export const setResponsive = (responsive) => {
    return {
        type: appConstants.SET_RESPONSIVE,
        payload: responsive
    }
}