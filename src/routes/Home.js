import React, { useState } from "react";
import Map from '../Components/Map';
import ReMap from '../Components/ReMap';
import { Logout } from '../Components/TokenSave';



let pos2 =[]; //props로 전달해줄 버스커의 현재위치값

function Home() {
  
  
  navigator.geolocation.getCurrentPosition((position) => {
    let pos = [];
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;      
    pos.push(`new kakao.maps.LatLng(${lat},${lon})`);
    pos2 = [...pos];
    // console.log(pos2);
  })
  const [pos20,setPos2] = useState('빈값')
  const startBus = () => {
    setPos2(pos2);
    console.log(pos20);
  }

  return (
      <div className="homeMap">
        {/* <Map/> */}
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
  );
}

function start() {
  // navigator.geolocation.getCurrentPosition((position) => {
  //     let pos = [];
  //     let lat = position.coords.latitude;
  //     let lon = position.coords.longitude;      
  //     pos.push(`new kakao.maps.LatLng(${lat},${lon})`);
  //     pos2 = [...pos];
  //     console.log(pos2);
  //     // <ReMap pos3={1}/>
  //   })
  }
  // <ReMap pos2={pos2}/>


export default Home;