import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import Home from "./Home";
import Projects from "./Projects";
import Blog from "./Blog";
import Single from "./Single";
import "../css/App.css";
import Footer from "./Footer";
import About from "./About";

const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/projects/" component={Projects} />
          <Route path="/blog/" component={Blog} />
          <Route path="/post/:title/" component={Single} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
