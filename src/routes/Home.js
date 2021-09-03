import React from "react";
import Map from '../Components/Map';

function Test({props}) {
  return <h1>hi testing.. {props}</h1>
}
function Home(props) {
  console.log(props);
  return (
    <div className="home">
      <Test props="test" />
    </div>
  );
}

export default Home;