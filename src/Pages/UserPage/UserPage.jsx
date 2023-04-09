import React, { useEffect } from 'react'
import "./UserPage.css"

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../Redux/actions/user'
import { Loading } from '../../Components'
import { Link } from 'react-router-dom'

const UserPage = ({ isLoading }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { current_user } = useSelector(state => state.userReducer);
    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch]);

    if (isLoading) return <Loading />

    return (
        <main className="user-page">
            <div className="container">
                <h2 className="user-page-title animate__animated animate__fadeInDown">@{current_user?.name} {id === "63d0110fc044bbcc3c2012b4" && <small style={{ fontSize: 13 }}>(Mekanın sahibi)</small>}</h2>
                <hr />
                <span>Shared articles: {current_user?.articles?.length}</span>
                <span style={{marginLeft: 10}}>Reputation: <span className="reputation-badge">{current_user?.reputation}</span></span>

                <ul className="user-page-articles-list animate__animated animate__fadeInLeft">
                    {current_user?.articles?.map(article => (
                        <li className="user-page-articles-list-item" key={article._id}><Link to={`/article/${article._id}`}>{article.title}</Link></li>
                    ))}
                </ul>
            
            </div>
        </main>
    )
}

export default UserPage