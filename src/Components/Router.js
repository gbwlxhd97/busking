import React from "react";
import {HashRouter as Router ,Route} from "react-router-dom";
import Home from '../routes/Home';
import Login from "../routes/Login";
import SignUp from "../routes/SignUp";

// eslint-disable-next-line
export default () => (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
    </Router>
)