import React from 'react';

var QRCode = require('qrcode.react');

function QrCode() {
	const name = '리액트';
    return (
    <>
        <QRCode value="https://focused-ride-b1185f.netlify.app/" />
    </>
);
}

export default QrCode;