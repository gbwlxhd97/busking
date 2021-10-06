import React from "react";
import Styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Logout } from '../Components/TokenSave';
import PropTypes from "prop-types";

const Header = Styled.div`
    display:flex;
    margin:0px;
    background-color:#233323;
    justify-content: space-around;
    align-items:center;
`;

const List = Styled.ul`
    margin:0px;
    list-style:none;
    display:flex;
    justify-content: space-around;
    align-items:center;
    padding: 10px;
`;

const Item = Styled.li`
    list-style:none;
    text-align:center;
    padding-left:2px;
    padding-right:2px;
    &:hover {
        border-bottom:3px solid #446844;
        transition:border-bottom 0.3s ease-in-out;
      }
`;

const SLink = Styled(Link)`
    color:#356735;
    text-decoration: none;
`;

const LogoutBtn = Styled.button`
    background-color:#233323;
    color:#356735;
    border:none;
    font-size:16px;
`;

const WithRouter = ({ nickname }) =>(
    <Header>
        <>
        <SLink to="/">
            BUSKiNG hELPER
        </SLink>
        <List>
            <Item>
                <SLink to="/">Home</SLink>
            </Item>
            
            <Item>
                <SLink to="/reservation">reservation</SLink>
            </Item>
        </List>

        <List>
            <SLink to={`/userdetail/${nickname}`}>
                {nickname}
            </SLink>
            <List>
                <LogoutBtn onClick={Logout}>
                    logout
                </LogoutBtn>
            </List>
        </List>
        </>
    </Header>
);

WithRouter.propTypes = {
    nickname:PropTypes.string
};

export default WithRouter;