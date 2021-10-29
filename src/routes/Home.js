import React from "react";
import Map from '../Components/Map';
import ReMap from '../Components/ReMap';
import { Logout } from '../Components/TokenSave';
import "./style/Home.css"

//porps로 넘겨 줘야함

function Home() {
  return (
    <>
      <div className="homeMap">
        {/* <Map/> */}
        <ReMap/>
      </div>
    </>
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