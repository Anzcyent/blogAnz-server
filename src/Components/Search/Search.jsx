import React, { useState } from 'react'
import './Search.css'

import { search } from '../../Redux/actions/articles';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleById } from '../../Redux/actions/articles';

const Search = ({ ownArticles }) => {
    const dispatch = useDispatch();
    const { filtered_articles } = useSelector(state => state.articlesReducer);
    const { searchLoading } = useSelector(state => state.appReducer);
    const { user } = useSelector(state => state.authReducer);
    const [controller, setController] = useState("");

    const handleSearch = (e) => {
        setController(e.target.value)
        if (e.target.value.trim() !== "") {
            dispatch(search(e.target.value))
        }
    }

    return (
        <div className="search-field animate__animated animate__fadeIn">
            <h2 className="search-field-title">Select a title from left side or search it.</h2>

            <input type="text" name="search" placeholder="Search Title" onChange={handleSearch} />
            {searchLoading && <span>...</span>}


            <ul className="search-field-list">
                {ownArticles && controller.trim() !== "" && filtered_articles?.length > 0 && filtered_articles?.filter(article => article.author === user?._id).map(article => (
                    <li onClick={() => dispatch(getArticleById(article._id))} className="search-field-list-item" key={article._id}>{article.title}</li>
                ))}

                {!ownArticles && controller.trim() !== "" && filtered_articles?.length > 0 && filtered_articles?.map(article => (
                    <li onClick={() => dispatch(getArticleById(article._id))} className="search-field-list-item" key={article._id}>{article.title}</li>
                ))}
            </ul>

        </div>
    )
}

export default Search