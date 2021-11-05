import React, { useState } from "react";
import ReMap from '../Components/ReMap';
import { Logout } from '../Components/TokenSave';
import LogoutHeader from "../Components/LogoutHeader"
import LoginHeader from "../Components/LoginHeader"
import { _teamServer } from '../service/team';

let pos2 =[]; //props로 전달해줄 버스커의 현재위치값
const startBusKing = '버스킹 방송시작하기!'
const endBusKing = '버스킹 방송종료'
let item =false;
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
      {/* {localStorage.getItem("username") ?
            <LoginHeader
                nickname={localStorage.getItem("username")}
            /> : <LogoutHeader/>} */}
        {
          
        <ReMap pos3={pos20}/> 
        }
        {localStorage.getItem('username') && (
          <div>
            닉네임 : {localStorage.getItem('username')}
            <button onClick={Logout}>logout</button>
            <button onClick={startBus,startBusK}>
              
              {item && endBusKing}
              {!item && startBusKing}
              </button>
          </div>
        )}
      </div>
    </>
  );
}


export default Home;