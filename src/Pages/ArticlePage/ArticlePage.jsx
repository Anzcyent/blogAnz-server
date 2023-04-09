import React, { useEffect } from 'react'
import "./ArticlePage.css"
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getArticleById, voteArticle } from "../../Redux/actions/articles"
import parse from "html-react-parser"
import moment from "moment"
import { Loading, Comments } from "../../Components"
import { deleteArticle } from '../../Redux/actions/articles'

const ArticlePage = ({ isLoading }) => {
    const dispatch = useDispatch()
    const { current_article } = useSelector(state => state.articlesReducer)
    const { user } = useSelector(state => state.authReducer)
    const { id } = useParams()
    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token');

    localStorage.setItem('article', id);


    useEffect(() => {
        dispatch(getArticleById(id))
    }, [dispatch])

    if (isLoading) return <Loading />

    return (
        <main className="article-page container">
            <h2 className="article-page-title">{current_article?.title}<button onClick={() => navigate(-1)} title="Go Back"><i className="fas fa-arrow-left"></i></button></h2>
            <hr />
            <section className="article-page-description">
                {parse(String(current_article?.description))}
            </section>

            <footer className="article-page-footer">
                <div>
                    <span><i className="fa-regular fa-calendar" id="article-date-icon" />{moment(current_article?.createdAt).format("MMM Do YYYY, h:mm:ss a")}</span>
                    <br />
                    <Link style={{ textDecoration: 'none', color: 'var(--primary-color)' }} to={`/profile/${current_article?.author?._id}`}>@{current_article?.author?.name} <span className="reputation-badge">{current_article?.author?.reputation}</span></Link>
                </div>

                {user?._id === current_article?.author?._id ? <div className="article-page-footer-utils">
                    <Link to={`/edit-article/${current_article?._id}`}><button style={{ backgroundColor: 'darkblue', padding: ".7rem" }}><i className="fa-solid fa-pen-to-square"></i></button></Link>
                    <button onClick={() => dispatch(deleteArticle(current_article?._id, access_token, navigate))} style={{ backgroundColor: 'red', padding: ".7rem" }}><i className="fa-solid fa-trash"></i></button>
                </div>
                    :
                    access_token &&
                    <div className="article-page-footer-utils">

                        <div className="article-page-footer-utils-like-button">
                            <button style={{ padding: ".7rem" }} onClick={() => dispatch(voteArticle(current_article?._id, access_token))}><i className="fa-solid fa-heart"></i>{current_article?.votes?.length > 0 && <span className="vote-count" style={{ marginLeft: 5 }}>{current_article.votes.length}</span>}</button>
                            {current_article?.votes?.includes(user?._id) && <span className='animate__animated animate__fadeIn' style={{ color: "var(--secondary-color)" }}>You liked it.</span>}
                        </div>

                    </div>
                }

            </footer>

            <hr />
            <br />
            <Comments id={id} article={current_article} token={access_token} />
        </main>
    )
}

export default ArticlePage