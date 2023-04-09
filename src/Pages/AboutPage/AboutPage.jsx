import React, { useState } from "react";
// import {en_title, tr_title, en_description, tr_description} from "../../Utils/Language/About/language"
import "./AboutPage.css";

const AboutPage = () => {
  // const [lang, setLang] = useState("en")

  return (
    <main className="about-page">
      <section className="container">
        {/* Aşağıdaki şart bloğunu h2 içerisine yapıştır */}
        {/* {lang === "en"
          ? en_title
          : lang === "tr"
          ? tr_title
          : "Wrong language format."} */}
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Our story began with an innovative idea and a passionate team. Our
          goal is to use technology to provide solutions that make people's
          lives easier, more enjoyable, and more productive. <br/> <br/> <br/> 
          
          We believe that
          every individual and business deserves access to the best tools and
          resources to thrive in today's fast-paced world. That's why we work
          tirelessly to develop cutting-edge products and services that empower
          our customers to achieve their goals. 
          <br/> <br/> <br/> 
          Our team consists of talented
          and experienced professionals from various backgrounds who share a
          common vision: to create a better world through technology. We are
          committed to providing exceptional customer service and support to
          ensure that our customers have the best experience possible.
          <br/> <br/> <br/> 
        At our core, we value creativity, innovation, and collaboration. We believe that by working together, we can achieve great things and make apositive impact on the world.
        <br/> <br/> <br/> 
        Thank you for choosing to be a part of
          our journey. We look forward to continuing to serve you with the best
          technology solutions.
        </p>
        {/* <p className="about-description">{lang === "en" ? en_description : lang === "tr" ? tr_description : "Wrong language format."}</p> */}
      </section>

      {/* <section className="language-buttons">
                <button onClick={() => setLang("en")}>EN</button>
                <button onClick={() => setLang("tr")}>TR</button>
            </section> */}
    </main>
  );
};

export default AboutPage;
