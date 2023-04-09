import React from 'react'
import { Link } from "react-router-dom"
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <main className="dashboard animate__animated animate__fadeIn">
      <Link to="/dashboard/my-articles" className="show-my-articles">
        <section >
          <p>Show My Articles</p>
        </section>
      </Link>

      <Link to="/dashboard/create-article" className="create-article">
        <section >
          <p>Create Article</p>
        </section>
      </Link>
    </main >
  )
}

export default Dashboard