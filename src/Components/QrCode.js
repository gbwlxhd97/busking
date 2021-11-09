import React from 'react';

var QRCode = require('qrcode.react');

function QrCode() {
	const name = '리액트';
    return (
    <>
    	<h1>{name}</h1>
        <h2>test</h2>
        <QRCode value="https://focused-ride-b1185f.netlify.app/" />
    </>
  );
}

export default QrCode;