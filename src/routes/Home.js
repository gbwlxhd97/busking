import React from "react";
import Map from '../Components/Map';
import { Link } from 'react-router-dom';
import "./style/Home.css";




function Home() {

  const x=1;

  return (
    <>
      <div className="homeMap">
        <Map/>
      </div>
    </>
  );
}


export default Home;