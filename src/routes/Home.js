import React from "react";
import Map from '../Components/Map';
import ReMap from '../Components/ReMap';
import { Logout } from '../Components/TokenSave';


function Home() {
  
  return (
      <div className="homeMap">
        <Map/>
        <ReMap/>
        {localStorage.getItem('username') && (
          <div>
            {localStorage.getItem('username')}
            <button onClick={Logout}>logout</button>
          </div>
        )}
      </div>
  );
}


export default Home;