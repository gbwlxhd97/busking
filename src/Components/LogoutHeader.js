import React from "react";
import Styled from "styled-components";
import { Link,WithRouter} from "react-router-dom";


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

export default WithRouter =>(
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
            <SLink to="/login">login</SLink>
        </Item>
        
        <Item>
            <SLink to="/signup">signup</SLink>
        </Item> 
    </List>

    </>
    </Header>
);
