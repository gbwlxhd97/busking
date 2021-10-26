import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    margin-top:10px;
`
const NowLyrics = styled.div`
    overflow: auto;
    height:100px;
    width:auto;
    border:2px solid black;
`;
const NowImg = styled.img`
    vertical-align:middle;
    height:50px;
    width:50px;
`;
const MusicInfo=styled.div`
    padding-top:10px;
    padding-bottom:10px;
`;

const Span = styled.span`
    border-bottom:2px solid black;
`;

const Lyrics = ({lyrics,singer,img,title}) =>(
    <Container>
        <Span>현재 노래 정보</Span>
        <MusicInfo>
            <NowImg src={img}/>
            <span>{singer}-{title}</span>
        </MusicInfo>
        <Span>가사:</Span>
        <NowLyrics>
            {lyrics.split('~').map(word=>(<div>{word}</div>))}
        </NowLyrics>
    </Container>
)

Lyrics.propTypes={
    lyrics:PropTypes.string,
    singer:PropTypes.string,
    img:PropTypes.string,
    title:PropTypes.string
}

export default Lyrics
