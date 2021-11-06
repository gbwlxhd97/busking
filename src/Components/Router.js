import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";
import SignUp from "../routes/SignUp";
import SearchUser from "../routes/SearchUser";
import Reservation from "../routes/Reservation";
import Detail from "../routes/Detail";
import LogoutHeader from "../Components/LogoutHeader";
import LoginHeader from "../Components/LoginHeader";
import UserRoom from "../routes/UserRoom";
import CreatTeam from "../routes/CreatTeam";
import BuskingMange from "../routes/BuskingManage";
import "../routes/Home.css";


export default () => (
  <Router>
    {localStorage.getItem("username") ? (
      <LoginHeader nickname={localStorage.getItem("username")} />
    ) : (
      <LogoutHeader />
    )}

    <>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/reservation/:teamName" exact component={Reservation} />
      <Route path="/userdetail/:nickName" exact component={Detail} />
      <Route path="/searchuser" exact component={SearchUser} />
      <Route path="/userroom/:teamName" exact component={UserRoom} />
      <Route path="/buskingmanage/:nickName" exact component={BuskingMange} />
      <Route path="/creatteam/:nickName" exact component={CreatTeam}/>
    </>
  </Router>
);
