import React from "react";
import Helmet from "react-helmet";
import "../css/Home.css";

export default function Home() {
  const pageTitle = "Hi, I'm Faran";
  const pageContent = `I'm a self-taught Software Developer specialized in Fullstack Development!`;
  const socialStyle = {
    color: "black",
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>Faran Mohammad - Fullstack Frontend Developer</title>
        <meta name="description" content="{pageContent}" />
      </Helmet>
      <h1 className="name">{pageTitle}</h1>
      <p className="description">Developer| Designer | Open-source Enthusiast</p>
      <h4 className="about">{pageContent}</h4>
      <p className="languages">
        Languages : ReactJS | NextJS | FastAPI | NodeJS | Tailwind
      </p>
      <div className="btn">
        <a href="mailto:ffaranm15@gmail.com">
          <strong>Say hello!</strong>
        </a>
      </div>
      <div className="social-container">
        <a
          href="https://twitter.com/faaaaraaaan"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <i
            title="Follow me on twitter"
            className="fab fa-twitter fa-2x"
            style={socialStyle}
          ></i>
        </a>
        <a
          href="https://www.youtube.com/@faranheit"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <i
            title="Subscribe to my YouTube Channel"
            className="fab fa-youtube fa-2x"
            style={socialStyle}
          ></i>
        </a>
        <a
          href="hhttps://github.com/Faranheit15"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <i
            title="Find me on Github"
            className="fab fa-github  fa-2x"
            style={socialStyle}
          ></i>
        </a>
        <a
          href="mailto:ffaranm15@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <i
            title="Mail me"
            className="fas fa-envelope fa-2x"
            style={socialStyle}
          ></i>
        </a>
      </div>
    </React.Fragment>
  );
}
