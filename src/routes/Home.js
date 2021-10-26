import React, { useState } from "react";
import ReMap from '../Components/ReMap';
import { Logout } from '../Components/TokenSave';


let pos2 =[]; //props로 전달해줄 버스커의 현재위치값

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
      <div>
        
        {
        <ReMap pos3={pos20}/> 
        }
        {localStorage.getItem('username') && (
          <div>
            닉네임 : {localStorage.getItem('username')}
            <button onClick={Logout}>logout</button>
            <button onClick={startBus}>버스킹 방송시작하기!</button>
          </div>
        )}
      </div>
    </>
  );
}


export default Home;