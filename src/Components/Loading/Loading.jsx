import React from 'react'
import "./Loading.css"
import { Triangle } from 'react-loader-spinner'

const Loading = () => {
  return (
    <main className="loading">
        <Triangle color="#000" />
    </main>
  )
}

export default Loading