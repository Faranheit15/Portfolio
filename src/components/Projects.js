import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import Project from './Project';
import '../css/Projects.css';

const pageTitle = 'Projects';

export default function Projects() {
  return (
    <Fragment>
      <Helmet>
        <title>{pageTitle} - Faran Mohammad</title>
      </Helmet>
      <h1>Projects</h1>
      <div className="projects">
        <div className="projects_list">
          <Project
            name="Netflix-GPT"
            description="A Netflix clone made in React with Tailwind CSS and Google's Firebase Authentication"
            type="React | Firebase"
            date="Feb 2024"
            link="https://faranheit15.github.io/Netflix-GPT/"
            linkText="Live"
          />
          <Project
            name="Fwiggy"
            description="A Swiggy clone made in React with Tailwind CSS. Added Redux for storing local authentication"
            type="React | Swiggy API"
            date="Jan 2024"
            link="https://github.com/Faranheit15/namaste-react/tree/project/fwiggy"
            linkText="GitHub"
          />
          <Project
            name="Konnect"
            description="Konnect is a text-messaging app, made using ReactJS and Firebase, which follows the concept of chatrooms"
            type="React | Firebase"
            date="Nov 2019"
            link="https://github.com/Faranheit15/Konnect"
            linkText="GitHub"
          />
          <Project
            name="CoviDost"
            description="A mobile app that will allow users to track the stats of the Covid-19 spread in various regions"
            type="Flutter | Covid-19 REST API"
            date="Nov 2019"
            link="https://github.com/Faranheit15/CoviDost"
            linkText="GitHub"
          />
          <Project
            name="Passweird"
            description="A React-Native based password generator app"
            type="React Native | Formik"
            date="March 2020"
            link="https://github.com/Faranheit15/Passweird"
            linkText="GitHub"
          />
        </div>
      </div>
    </Fragment>
  );
}
