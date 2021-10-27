import React, { useState } from "react";
import ReMap from '../Components/ReMap';
import styled from 'styled-components';


let pos2 =[]; //props로 전달해줄 버스커의 현재위치값

const Costainer = styled.div`
  margin-left:37px;
  margin-top:100px;
`;

const StartBtn =styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang&family=Nanum+Gothic&display=swap');
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 20px;
  color:#FFC314;
  border:none;
  background-color:#282828;
  padding:0px;
`;

const Span1 = styled.span`
  font-size:13px;
  color:#8AE634;
`;

const Span2 = styled.span`
  font-size:13px;
  color:white;
`;

function Home() {
  
  navigator.geolocation.getCurrentPosition((position) => {
    let pos = [];
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;      
    pos.push(`${lat},${lon}`);
    pos2 = [...pos];
    // console.log(pos2);
  })
  const [pos20,setPos2] = useState([])
  const startBus = () => {
    setPos2(pos2);
    console.log(pos20);
  }
  
  return (
    <>
      <ReMap pos3={pos20}/>
      <Costainer>
      <StartBtn onClick={startBus}>⎧버스킹 방송시작하기 ᐳ</StartBtn>
      <br/>
      <Span1>버스킹을 시작하시려면 위를 눌러주세요.</Span1>
      <br/>
      <br/>
      <Span2>버스커들이 당신을 기다리는 장소</Span2>
      </Costainer>
    </>
  );
}


export default Home;