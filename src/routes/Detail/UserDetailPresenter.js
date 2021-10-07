import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Section = styled.div``;

const UserImg = styled.div``;

const UserDetail = ({
        userDnickname,
        birthday,
        gender
    }) =>(
        <div>asdf</div>
    )

UserDetail.propsTypes={
    userDnickname:PropTypes.string,
    birthday:PropTypes.string,
    gender:PropTypes.string
}