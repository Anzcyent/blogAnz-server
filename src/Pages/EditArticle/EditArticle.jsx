import React, { useState, useEffect } from 'react'
import './EditArticle.css'
import parse from "html-react-parser"
import { Link, useNavigate, useParams } from "react-router-dom"
import { editArticle, getArticleById } from '../../Redux/actions/articles'
import { useDispatch, useSelector } from "react-redux"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const editorConfig = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ size: ['small', 'normal', 'large'] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: "ordered" }],
        ['link']
    ]
}

const CreateArticle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const access_token = localStorage.getItem('access_token');
    const {id} = useParams();
    const {current_article} = useSelector(state => state.articlesReducer);
    const [data, setData] = useState({ title: current_article?.title, description: current_article?.description });
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^(<p|<h[1-6])><br><\/(p|h[1-6])>$/.test(data.description)) {
            dispatch(editArticle(id, data, access_token, navigate))
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }

    useEffect(() => {
        if (!access_token) {
            alert("You have to login for this operation.");
            navigate('/login');
        }

        dispatch(getArticleById(id))
    }, [])

    return (
        <main className="edit-article-page">
            <h2 className='edit-article-page-title animate__animated animate__backInDown'>Edit Article</h2>

            <form method="POST" className="edit-article-form animate__animated animate__zoomIn">
                <div className="edit-article-title">
                    <label htmlFor="title"><h4>Title</h4></label>
                    <input defaultValue={current_article?.title} type="text" name="title" id="title" onChange={handleChange} />
                </div>

                <ReactQuill theme="snow" defaultValue={current_article?.description} onChange={e => setData({ ...data, description: e })} className='edit-article-editor' modules={editorConfig} />

                <button onClick={handleSubmit} className='edit-article-submit' type="submit">Edit</button>
            </form>


            {
                !/^(<p|<h[1-6])><br><\/(p|h[1-6])>$/.test(data.description) && data.description !== "" && <section className="edit-article-preview animate__animated animate__fadeIn">
                    <h5>Preview</h5>
                    {parse(data.description)}
                </section>}


            <Link to="/dashboard">
                <button className="return-button animate__animated animate__fadeInUp"><i className="fas fa-arrow-left"></i> Return to dashboard</button>
            </Link>
        </main>
    )
}


export default CreateArticle