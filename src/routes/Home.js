import React, { useEffect, useState } from "react";
// import QrCode from '../Components/QrCode';
import ReMap from '../Components/ReMap';
import { Logout } from '../Components/TokenSave';
import { _teamServer } from '../service/team';
import {_userRoom} from "../service/room";



let currentPos =[]; //props로 전달해줄 버스커의 현재위치값
let savePos = [] //해당위치를 계속 저장해주는 배열
let juen
const startBusKing = '버스킹 방송시작하기!'
const endBusKing = '버스킹 방송종료'
let item =false;
function Home() {
  
  navigator.geolocation.getCurrentPosition((position) => {
    let pos = [];
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;      
    juen = `${lat},${lon}`;
    pos.push(
      {"pos": `${lat}/${lon}`,"teamName": localStorage.getItem('teamname')});
    currentPos = [...pos];
  })
  const [statePos,setPos] = useState([]) //홈에서 map 으로 pos정보를 주기위한 state 단 map에서는 props임
  useEffect(() => {
    console.log(statePos.map(item => item.pos).join(',').split(',').map(e => parseFloat(e)));
    let saveName = savePos.map(e => e.teamName)
    let pushName = statePos.map(e => e.teamName).join("")
    if(saveName.includes(pushName) === true) {
      savePos.splice(savePos.indexOf(pushName),1)
      console.log('중복');
    } else {
      savePos = [...savePos,...statePos]
      console.log('안중복');
    }
    console.log(savePos);
  },[statePos])

  const startBus = () => {
    setPos(currentPos);

  }

  const startRomm = async() => {
    try {
      const res = await _userRoom.creatRoom({
        roomName: "1번팀의 방",
        teamName: "1번팀",
        latIng: juen
      })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const removeRoom = async () => {
    try {
      const res = await _userRoom.deleteRoom({
        roomName: "1번팀의 방",
        teamName: "1번팀",
      })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const startBusK = async() => {
    try {
      const res = await _teamServer.postOnAir({
        teamName: localStorage.getItem('teamname')
      })
      if(res.data.data === false) {
        alert('방송종료')
      }else {
        alert('방송시작!');
      }
      item = !item;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <ReMap posData={savePos}/> 
        {localStorage.getItem('username') && (
          <div>
            닉네임 : {localStorage.getItem('username')}
            <button onClick={Logout}>logout</button>
            <button onClick={removeRoom}>방종하기</button>
            <button onClick={startRomm}>
              {item && endBusKing}
              {!item && startBusKing}
              </button>
              <button onClick={startBus} >위치 테스트</button>
          </div>
        )}
      </div>
    </>
  );
}


export default Home;