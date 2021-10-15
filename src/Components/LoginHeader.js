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
    border-bottom:3px solid rgba(255,0,0,0.1);
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
`;

const SLink = Styled(Link)`
    color:gray;
    text-decoration: none;
    &:hover {
        border-bottom:3px solid #446844;
        transition:border-bottom 0.3s ease-in-out;
      }
`;

const LogoutBtn = Styled.button`
    background-color:#233323;
    color:gray;
    border:none;
    padding:0px;
    font-family:'Malgun Gothic';
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
            <Item>
                <SLink to={`/userdetail/${nickname}`}>
                    {nickname}
                </SLink>
            </Item>

            <Item>
                <LogoutBtn onClick={Logout}>
                    <SLink to="/">Logout</SLink>
                </LogoutBtn>
            </Item>
        </List>
        </>
    </Header>
);

WithRouter.propTypes = {
    nickname:PropTypes.string
};

export default WithRouter;