import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import Posts from './Posts';
import 'github-markdown-css';
import '../css/Single.css';
const Single = ({ match }) => {
  var post;

  // eslint-disable-next-line
  [...Posts()].map((item) => {
    const url = item[0];
    if (url === match.params.title) {
      post = item;
    }
  });

  const { title, date, __content } = post[1];

  var d = new Date(date);
  var dated = d.toISOString().slice(0, 10).replace(/-/g, "/");

  return (
    <Fragment>
      <Helmet>
        <title>{title} - Blog - Umair Ayub</title>
      </Helmet>
      <div className="container">
        <h1 className="pageTitle">{title}</h1>
        <span className="pageDate">{dated}</span>
        <div
          className="pageBody"
          dangerouslySetInnerHTML={{ __html: __content }}
        ></div>
        <NavLink className="pageBack" to={"/blog/"}>
          « Back
        </NavLink>
      </div>
    </Fragment>
  );
};

export default Single;
