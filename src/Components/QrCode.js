import React from 'react';
import styled from "styled-components";

const Contents = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  top: 170px;
  left: 35%;
  
`
const Text = styled.h2`
  color: white;
  position: absolute;
  top: 70%;
  left: 5%;
`
const QR = styled.div`

`
var QRCode = require('qrcode.react');

function QrCode() {
	const name = '버스킹 QR';
    return (
    <>
      <Contents>
        <Text>{name}</Text>
        <QR>
          <QRCode 
            value="https://focused-ride-b1185f.netlify.app/"
            includeMargin="true"
            size="125"
          />
        </QR>
      </Contents>
    </>
  );
}

export default QrCode;