import React from 'react'
import PropTypes from 'prop-types'
import '../css/Project.css'


function Project(props) {
  return (
        <React.Fragment>
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <div className="card">
              <div className="card-text">
                <span className="date">{props.date}</span>
                <h4 className="ProjectName">{props.name}</h4>
                <p className="ProjectDescription">{props.description} </p>
                <p className="type">{props.type}</p>
              </div>
            <div className="card-link">
                  <div className="link">
                  <p className="linkText">{props.linkText}</p>
                </div>
              </div>
              </div>
          </a>
        </React.Fragment>
    )
}

Project.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  linkText : PropTypes.string
}

export default Project
