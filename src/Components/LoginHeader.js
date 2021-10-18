import React from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { Logout } from '../Components/TokenSave';
import PropTypes from "prop-types";

const Header = Styled.div`
    font-size:15px;
    display:flex;
    padding: 10px;
    background: linear-gradient( to bottom, black, rgba(125,125,125,0.001) );
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
`;

const SLink = Styled(Link)`
    color:white;
    text-decoration: none;
    &:hover {
        border-bottom:3px solid black;
        transition:border-bottom 0.3s ease-in-out;
      }
`;

const LogoutBtn = Styled.button`
    background-color:rgba(0,0,0,0);
    color:white;
    border:none;
    padding:0px;
    font-family:'Malgun Gothic';
    font-size:16px;
`;

const WithRouter = ({ nickname }) =>(
    <Header>
        <SLink to="/">
            BUSKiNG hELPER
        </SLink>
        <List>
            <Item>
                <SLink to="/searchuser">버스커 찾기</SLink>
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
    </Header>
);

WithRouter.propTypes = {
    nickname:PropTypes.string
};

export default WithRouter;