import { articlesConstants } from "../constants";

const initialState = {
    articles: [],
    current_article: {},
    filtered_articles: []
}


const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case articlesConstants.GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            };

        case articlesConstants.GET_CURRENT_ARTICLE:
            return {
                ...state,
                current_article: action.payload
            }
        case articlesConstants.GET_ARTICLES_OF_OWNER:
            return {
                ...state,
                articles: action.payload
            }
        case articlesConstants.SEARCH_ARTICLES:
            return {
                ...state,
                filtered_articles: action.payload
            }
        default:
            return state;
    }


}

export default articlesReducer