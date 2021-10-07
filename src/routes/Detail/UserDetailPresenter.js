import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    height:100vh;
    display:flex;
    padding-bottom:2%;
    background-color:#1C1F1C;
`;

const ImgSection = styled.div`
    margin-left:25%;
    margin-top:100px;
`;

const DetailSectionList = styled.ul`
    margin-top:190px;
    padding-left:2%;
    color:gray;
`;

const Details = styled.li`
    list-style:none;
    margin-bottom:50px;
`;

const UserImg = styled.img`
    width:250px;
    height:250px;
    padding:50px;
    border-bottom:1px solid gray;
    border-right:1px solid gray;
    border-radius:50%;
`;

const UserDetail = ({
        userNickname,
        userImgUrl,
        birthday,
        gender
    }) =>(
        <Container>
            <ImgSection>
                <UserImg src={userImgUrl}/>
            </ImgSection>

            <DetailSectionList>
                <Details>
                    userNickname: {userNickname}
                </Details>
                <Details>
                    birthday: {birthday}
                </Details>                
                <Details>
                    gender: {gender}
                </Details>
            </DetailSectionList>
        </Container>

    )

UserDetail.propsTypes={
    userNickname:PropTypes.string,
    birthday:PropTypes.string,
    gender:PropTypes.string,
    userImgUrl:PropTypes.string
}

export default UserDetail;