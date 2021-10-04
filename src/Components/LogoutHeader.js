import React from "react";
import Styled from "styled-components";
import { Link} from "react-router-dom";

const Header = Styled.div`
    margin:0px;
    background-color:black;
`;

const List = Styled.ul`
    margin:0px;
    list-style:none;
    display:flex;
    justify-content: space-around;
    align-items:center;
`;

const Item = Styled.li`
    text-align:center;
`;

const SLink = Styled(Link)`
    color:white;
    text-decoration: none;
`;

export default withRouter =>(
    <Header>
        <List>
            <Item>
                <SLink to="/">Home</SLink>
            </Item>
            
            <Item>
                <SLink to="/reservation">reservation</SLink>
            </Item>
            
            <Item>
                <SLink to="/login">login</SLink>
            </Item>
            
            <Item>
                <SLink to="/signup">signup</SLink>
            </Item>      
        </List>
    </Header>
);