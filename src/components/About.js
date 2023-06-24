import React, { Fragment } from "react";
import "../css/About.css";

export default function About() {
  return (
    <Fragment>
      <h1>About</h1>
      <div className="about-container">
        <div className="inner-container">
          <p>
            Faran Mohammad is a self-taught developer specializing in Frontend
            Development.
          </p>
          <p>
            Developer and an open-source enthusiast currently employed at
            UsefulBi Corporation, India, as a Frontend Developer, where he is
            working on the UI design of most of their products and also
            contributing to their clients as a Data Engineer. He is looking for
            a dynamic development environment where he can learn new things
            everyday and contribute to something big. Currently, he is trying to
            gain a good knowledge of SQL, Python, Plotly and Databricks.
          </p>
          <p>
            He wants to help others like him and improve his other skills.
          </p>
          <p>
            When he's free, he likes to travel or play online multiplayer games.
          </p>

          <p className="info">
            This website was built using React and other tools. Hosted on
            Netlify.
          </p>
        </div>
      </div>
    </Fragment>
  );
}
