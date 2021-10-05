import React from "react";
import Styled from "styled-components";
import { Link} from "react-router-dom";


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
    padding-left:20px;
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

const Logo = Styled.div`
    color:#356735;
`;




export default withRouter =>(
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

