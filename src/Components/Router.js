import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from '../routes/Home';
import Login from "../routes/Login";
import SignUp from "../routes/SignUp";
import Reservation from "../routes/Reservation"
import Header from "../Components/Header"

// eslint-disable-next-line
export default () => (
    <Router>
        <Header/>
        <>
            <Route path="/" exact component={Home} /> 
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/reservation" exact component={Reservation} /> 
        </>
    </Router>
)
