import React from 'react'
import { useForm } from "react-hook-form"
import { authLogin } from '../../Redux/actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./LoginPage.css"

const LoginPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(authLogin(data, navigate));
  }


  return (
    <main className="login-page container">
      <h1 className='login-page-title animate__animated animate__backInDown'>Login</h1>

      <form className='login-page-form animate__animated animate__zoomIn' onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="E-Mail" {...register("email", { required: "This field is required" })} />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
        <input type="password" placeholder="Password" {...register("password", { required: "This field is required" })} />
        {errors.password && <span className="form-error">{errors.password.message}</span>}

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default LoginPage