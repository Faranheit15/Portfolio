import React, { Fragment } from "react";
import Helmet from "react-helmet";
// import MyResume from "../resume/Faran.Mohammad.resume.pdf";

const pageTitle = "Resume";

const Resume = () => {
    return (
        <Fragment>
            <Helmet>
                <title>{pageTitle} - Faran Mohammad</title>
            </Helmet>
            <h1>Resume</h1>
            <div className="btn">
                {/* <a href={MyResume} download="Faran.Mohammad.Resume.pdf"> */}
                <strong>Download Resume!</strong>
                {/* </a> */}
            </div>
        </Fragment>
    );
};

export default Resume;