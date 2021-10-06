import React from "react";
import Map from '../Components/Map';
import ReMap from '../Components/ReMap';
import { Logout } from '../Components/TokenSave';


function Home() {
  
  return (
      <div className="homeMap">
        {/* <Map/> */}
        <ReMap/>
        {localStorage.getItem('username') && (
          <div>
            닉네임 : {localStorage.getItem('username')}
            <button onClick={Logout}>logout</button>
            <button onClick={start}>버스킹 방송시작하기!</button>
          </div>
        )}
      </div>
  );
}

function start() {
  navigator.geolocation.getCurrentPosition((position) => {
    let pos = [];
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;      
      pos.push(`new kakao.maps.LatLng(${lat},${lon})`)
      console.log(pos);
      // console.log(lat,lon);
    })
  
}



export default Home;