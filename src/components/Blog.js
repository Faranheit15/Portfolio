import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom';
import Posts from './Posts';
import '../css/Blog.css';
const pageTitle = 'Blog';

export default function Blog() {
  return (
    <Fragment>
      <Helmet>
        <title>{pageTitle} - Faran Mohammad</title>
      </Helmet>
      <div className="container">
        <h1 className="pageTitle">{pageTitle}</h1>
        <ul className="blogList">
          {[...Posts()].map((post) => {
            const url = post[0];
            const { title } = post[1];
            console.log(url);
            return (
              <li className="listItem">
                <NavLink
                  key={url}
                  style={{ display: "block" }}
                  to={"/post/" + url}
                >
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
}
