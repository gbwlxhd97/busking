import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  margin-left: 5px;
`;
const NowLyrics = styled.div`
  overflow: auto;
  height: 200px;
  width: 345px;
  margin-top: 4px;
  border-top: 2px solid #adadad;
  border-bottom: 2px solid #adadad;
`;

const NowImg = styled.img`
  vertical-align: middle;
  height: 60px;
  width: 60px;
  margin-right: 10px;
`;

const MusicInfo = styled.div`
  display: inline-block;
  padding-bottom: 10px;
`;

const Span1 = styled.span`
  font-size: 17px;
`

const Span = styled.span`
  border-bottom: 2px solid black;
`;

const OpenBtn = styled.button`
  margin-left: 6px;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 10px;
  background-color: gray;
`



function Lyrics({ lyrics, singer, img, title }) {
  const [open, setOpen] = useState(false);

  const openLyrics = () => {
    setOpen(!open);
  };

  return(
    <Container>
      <br />
      <MusicInfo>
        <NowImg src={img} />
        <Span1>
          {singer} - {title}
        </Span1>
      </MusicInfo>
      <br />
      <Span>가사:</Span>
      <OpenBtn onClick={openLyrics}>가사 펼쳐보기</OpenBtn>
      {open && (
        <NowLyrics>
          {lyrics.split("~").map((word, index) => (
            <div key={index}>{word}</div>
          ))}
        </NowLyrics>
      )}
    </Container>
  );
}

Lyrics.propTypes = {
  lyrics: PropTypes.string,
  singer: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
};

export default Lyrics;