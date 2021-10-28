import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from '../routes/Home';
import Login from "../routes/Login";
import SignUp from "../routes/SignUp";
import SearchUser from "../routes/SearchUser";
import Reservation from "../routes/Reservation"
import Detail from "../routes/Detail"
import LogoutHeader from "../Components/LogoutHeader"
import LoginHeader from "../Components/LoginHeader"
import UserRoom from "../routes/UserRoom"

// eslint-disable-next-line
export default () => (
    <Router>
        {localStorage.getItem("username") ?
            <LoginHeader
                nickname={localStorage.getItem("username")}
            /> : <LogoutHeader/>}
        
        <>
            <Route path="/" exact component={Home} /> 
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/reservation" exact component={Reservation} /> 
            <Route path="/userdetail/:nickName" exact component={Detail}/>
            <Route path="/searchuser" exact component={SearchUser}/>
            <Route path="/userroom/:nickName" exact component={UserRoom}/>
        </>
    </Router>
)