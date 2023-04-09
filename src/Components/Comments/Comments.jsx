import React, { useState, useEffect } from 'react'
import './Comments.css'

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { createComment, voteComment, deleteComment } from '../../Redux/actions/comments'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Comments = ({ id, article }) => {
    const [data, setData] = useState({ description: "" });
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const access_token = localStorage.getItem('access_token');

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authReducer);

    const onSubmit = () => {
        const isOnlySpaces = data.description.trim().length === 0;
        const isTooShort = data.description.trim().replace(/\s+/g, '').length < 10;

        if (!isOnlySpaces && !isTooShort) {
            dispatch(createComment(id, data, access_token));
        } else {
            alert("Your comment must contain at least 10 characters without spaces.");
        }
    }

    const vote = (comment_id) => {
        dispatch(voteComment(comment_id, access_token));
    }

    const _delete = (comment_id) => {
        dispatch(deleteComment(comment_id, access_token));
    }


    useEffect(() => {
        setData({ description: watch('description') })
    }, [watch('description')])

    return (
        <div className="comments-section">
            <h5>Comments</h5>

            {access_token && <form autoComplete="off" className='comments-form' onSubmit={handleSubmit(onSubmit)}>

                <input type="text" placeholder="What's your comment about this article?" name="description" {...register('description', {
                    required: "This field is required", minLength: {
                        value: 10,
                        message: "Please provide at least 10 characters."
                    }, maxLength: {
                        value: 100,
                        message: "Please don't exceed 100 characters."
                    }
                })} />

                <button type="submit">Submit</button>
            </form>}

            {access_token && errors.description && <span className="form-error">{errors.description.message}</span>}
            <br />

            <div className="comments">
                {article?.comments?.map(comment => (
                    <div key={comment._id} className="comment animate__animated animate__fadeIn">
                        <div className="comment-user-area">
                            <Link to={`/profile/${comment.user._id}`}>{comment.user.name}</Link>
                            <span className="reputation-badge">{comment.user.reputation}</span>
                        </div>
                        <div className="comment-description-area">
                            <div className="comment-info">
                                <p className="comment-description">{comment.description}</p>
                                <small className="comment-date"><i className="fa-regular fa-calendar" /> {moment(comment.createdAt).format("MMM Do YYYY")}</small>
                            </div>

                            {access_token &&
                                <div className="comment-utils">
                                    <span className="vote" onClick={() => vote(comment._id)}>
                                        <i className="fa-solid fa-angle-up"></i>
                                        <small className="vote-count">{comment?.votes?.length}</small>
                                    </span>

                                    {comment.user._id === user?._id
                                        &&
                                        <div className="delete-comment" onClick={() => _delete(comment._id)}>
                                            <i style={{ color: 'red' }} className="fas fa-trash"></i>
                                        </div>
                                    }
                                </div>
                            }

                        </div>
                    </div>
                ))}
            </div>

        </div >
    )
}

export default Comments