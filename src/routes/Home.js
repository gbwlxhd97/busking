import React, { useEffect, useState } from "react";
import QrCode from '../Components/QrCode';
import ReMap from '../Components/ReMap';
import { Logout } from '../Components/TokenSave';
import { _teamServer } from '../service/team';



let currentPos =[]; //props로 전달해줄 버스커의 현재위치값
const startBusKing = '버스킹 방송시작하기!'
const endBusKing = '버스킹 방송종료'
let item =false;
function Home() {
  
  navigator.geolocation.getCurrentPosition((position) => {
    let pos = [];
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;      
    pos.push(
      {"pos": `${lat},${lon}`,"teamName": localStorage.getItem('teamname')});
    currentPos = [...pos];
  })
  const [statePos,setPos] = useState([]) //홈에서 map 으로 pos정보를 주기위한 state 단 map에서는 props임
  useEffect(() => {
    console.log(statePos.map(item => item.pos).join(',').split(',').map(e => parseFloat(e)));
  },[statePos])

  const startBus = () => {
    setPos(currentPos);
  }
  
  const startBusK = async() => {
    try {
      const res = await _teamServer.postOnAir({
        teamName: localStorage.getItem('teamname')
      })
      alert('방송시작!');
      item = !item;
      console.log(item);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <ReMap posData={statePos}/> 
        {localStorage.getItem('username') && (
          <div>
            닉네임 : {localStorage.getItem('username')}
            <button onClick={Logout}>logout</button>
            <button onClick={startBusK}>
              
              {item && endBusKing}
              {!item && startBusKing}
              </button>
              <button onClick={startBus} >위치 테스트</button>
          </div>
        )}
        <QrCode />
      </div>
    </>
  );
}


export default Home;