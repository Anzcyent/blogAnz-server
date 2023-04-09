import React, { useState } from "react";
import "./HomePage.css";
import home_image from "../../assets/home_image.jpg";

const HomePage = () => {
  return (
    <main className="home-page">
      <h2 className="home-page-title animate__animated animate__backInDown">
        Welcome To Bloganz
      </h2>

      <section className="home-page-image-section animate__animated animate__zoomIn">
        <img
          className="home-page-image"
          src={home_image}
          alt="home_image"
        />
      </section>

      <section className="home-page-description animate__animated animate__fadeIn">
        <h4 className="home-page-description animate__animated animate__backInDown">
          Bloganz is an online platform that allows you to create and manage
          your blog posts.
        </h4>
        <hr />
        <small className="animate__animated animate__fadeIn">It is now beta 1.0.0 version.</small>
      </section>
    </main>
  );
};

export default HomePage;
