import React, { useEffect, useState } from 'react'
import "./ArticlesPage.css"
import { useDispatch, useSelector } from "react-redux"
import { getArticles, getArticleById } from '../../Redux/actions/articles'
import { Article, Search } from '../../Components'
import { Link } from 'react-router-dom'


const ArticlesPage = ({ isLoading }) => {
  const dispatch = useDispatch();
  const { articles, current_article } = useSelector(state => state.articlesReducer);
  const [active_title, setActiveTitle] = useState(null);


  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])


  const setCurrentArticle = (article) => {
    dispatch(getArticleById(article._id))
    setActiveTitle(article.title)
  }



  if (!isLoading && articles.length === 0) return <main className="articles-page">
    <div className="articles-page-no-article">
      <h2>It seems that there is no blog shared with others. <Link to="/dashboard/create-article">Wanna create the first one?</Link></h2>
    </div>
  </main>


  return (
    <main className="articles-page">
      <section className="article-titles animate__animated animate__fadeInLeft">
        <h2 className="article-titles-title">Article Titles</h2>
        <ul className="article-titles-list">
          {articles?.map(article => (
            <li key={article._id} onClick={() => setCurrentArticle(article)} className={`article-titles-list-item ${active_title === article.title && "title-active"}`}>{article.title}</li>
          ))}
        </ul>
      </section>
      <section>
        {current_article._id ? <Article article={current_article} isLoading={isLoading} /> : <Search /> }
      </section>
    </main>
  )
}

export default ArticlesPage