import React from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";

const Header = Styled.div`
    display:flex;
    padding: 10px;
    background-color:#323232;
    justify-content: space-around;
    align-items:center;
    border-bottom:3px solid #FFC314;
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
        border-bottom:3px solid #FFC314;
        transition:border-bottom 0.3s ease-in-out;
    }
`;

export default (WithRouter) => (
  <Header>
    <>
      <SLink to="/">BUSKiNG hELPER</SLink>
      <List>
        <Item>
          <SLink to="/searchuser">버스커 검색</SLink>
        </Item>
      </List>
      <List>
        <Item>
          <SLink to="/login">Login</SLink>
        </Item>

        <Item>
          <SLink to="/signup">Signup</SLink>
        </Item>
      </List>
    </>
  </Header>
);
