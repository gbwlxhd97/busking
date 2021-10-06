import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from '../routes/Home';
import Login from "../routes/Login";
import SignUp from "../routes/SignUp";
import Reservation from "../routes/Reservation"
import Detail from "../routes/Detail/UserDetailContainer"
import LogoutHeader from "../Components/LogoutHeader"
import LoginHeader from "../Components/LoginHeader"

// eslint-disable-next-line
export default () => (
    <Router>
        {localStorage.getItem("username") ?
            <LoginHeader
                nickname="아이유"
            /> : <LogoutHeader/>}
        <>
            <Route path="/" exact component={Home} /> 
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/reservation" exact component={Reservation} /> 
            <Route path="/userdetail/:nickname" exact component={Detail}/>
        </>
    </Router>
)