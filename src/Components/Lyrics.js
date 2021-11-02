import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  margin-top: 10px;
`;
const NowLyrics = styled.div`
  overflow: auto;
  height: 100px;
  width: 375px;
  padding-left: 10px;
  border-top: 2px solid #adadad;
  border-bottom: 2px solid #adadad;
`;
const NowImg = styled.img`
  vertical-align: middle;
  height: 50px;
  width: 50px;
`;
const MusicInfo = styled.div`
  display: inline-block;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Span = styled.span`
  border-bottom: 2px solid black;
`;

const Lyrics = ({ lyrics, singer, img, title }) => (
  <Container>
    <Span>현재 노래 정보</Span>
    <br />
    <MusicInfo>
      <NowImg src={img} />
      <span>
        {singer}-{title}
      </span>
    </MusicInfo>
    <br />
    <Span>가사:</Span>
    <NowLyrics>
      {lyrics.split("~").map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </NowLyrics>
  </Container>
);

Lyrics.propTypes = {
  lyrics: PropTypes.string,
  singer: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
};

export default Lyrics;