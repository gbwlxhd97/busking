import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
<<<<<<< HEAD
  margin-left: 5px;
=======
  margin-top: 10px;
>>>>>>> 6d83efe1e8ee96ae792bc57de3d5bdd894b5b9e4
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
<<<<<<< HEAD
  height: 60px;
  width: 60px;
  margin-right: 10px;
=======
  height: 150px;
  width: 150px;
>>>>>>> 6d83efe1e8ee96ae792bc57de3d5bdd894b5b9e4
`;

const MusicInfo = styled.div`
  margin-left: 113px;
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

  return (
    <Container>
      <br />
      <MusicInfo>
        <NowImg src={img} />
<<<<<<< HEAD
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
=======
        <br />
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
>>>>>>> 6d83efe1e8ee96ae792bc57de3d5bdd894b5b9e4
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
