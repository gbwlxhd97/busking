import React, { useState } from "react";
import ReMap from '../Components/ReMap';
import { Logout } from '../Components/TokenSave';
import LogoutHeader from "../Components/LogoutHeader"
import LoginHeader from "../Components/LoginHeader"
import { _teamServer } from '../service/team';

let propsPos =[]; //props로 전달해줄 버스커의 현재위치값
const startBusKing = '버스킹 방송시작하기!'
const endBusKing = '버스킹 방송종료'
let item =false;
function Home() {
  
  navigator.geolocation.getCurrentPosition((position) => {
    let pos = [];
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;      
    pos.push(`${lat},${lon}`);
    propsPos = [...pos];
    console.log(propsPos);
  })
  const [statePos,setPos] = useState([])
  const startBus = () => {
    setPos(propsPos);
    console.log(statePos);
  }
  
  const startBusK = async() => {
    try {
      const res = await _teamServer.postOnAir({
        teamName: localStorage.getItem('teamname')
      })
      alert('방송시작!');
      item = !item;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
      {/* {localStorage.getItem("username") ?
            <LoginHeader
                nickname={localStorage.getItem("username")}
            /> : <LogoutHeader/>} */}
        {
          
        <ReMap pos3={statePos}/> 
        }
        {localStorage.getItem('username') && (
          <div>
            닉네임 : {localStorage.getItem('username')}
            <button onClick={Logout}>logout</button>
            <button onClick={startBusK}>
              
              {item && endBusKing}
              {!item && startBusKing}
              </button>
              <button onClick={startBus}>테스트</button>
          </div>
        )}
      </div>
    </>
  );
}


export default Home;