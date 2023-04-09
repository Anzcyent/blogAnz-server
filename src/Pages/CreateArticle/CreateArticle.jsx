import React, { useState, useEffect } from 'react'
import './CreateArticle.css'
import parse from "html-react-parser"
import { Link, useNavigate } from "react-router-dom"
import { createArticle } from "../../Redux/actions/articles"
import { useDispatch } from "react-redux"
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

// react-hook-form kullanmadım çünkü text editör işi bozuyor
const CreateArticle = () => {
    const [data, setData] = useState({ title: "", description: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const access_token = localStorage.getItem('access_token');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const isOnlySpaces = data.title.trim().length === 0;
        const isTooShort = data.title.trim().replace(/\s+/g, '').length < 5;

        if (!/^(<p|<h[1-6])><br><\/(p|h[1-6])>$/.test(data.description) && !isOnlySpaces && !isTooShort) {
            dispatch(createArticle(data, access_token, navigate))
        }

        setSubmitted(true);
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
    }, [])

    return (
        <main className="create-article-page">
            <h2 className='create-article-page-title animate__animated animate__backInDown'>Create Article</h2>

            <form onSubmit={handleSubmit} method="POST" className="create-article-form animate__animated animate__zoomIn">
                <div className="create-article-title">
                    <label htmlFor="title"><h4>Title</h4></label>
                    <input type="text" name="title" id="title" onChange={handleChange} />
                    {submitted && (data.title.length < 5 || data.title.length > 35 || !data.title) && <span className="form-error">Your title should be longer than 5 and shorther than 35 characters.</span>}
                </div>

                <ReactQuill theme="snow" onChange={e => setData({ ...data, description: e })} className='create-article-editor' modules={editorConfig} />
                {submitted && (data.description.length < 100 || !data.description) && <span className="form-error">Your description is too short.</span>}

                <button className='create-article-submit' type="submit">Create</button>
            </form>


            {
                !/^(<p|<h[1-6])><br><\/(p|h[1-6])>$/.test(data.description) && data.description !== "" && <section className="create-article-preview animate__animated animate__fadeIn">
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