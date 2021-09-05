import React from "react";
import Map from "../Components/Map";
import "./style/Home.css"

function Home() {

  const x=1;

  return (
    <div>    
   
    <div className="header">
      <div className="logo">
         LOGO
      </div>

      <div className="function">
        <ul>
          <li className="element">1</li>
          <li className="element">2</li>
          <li className="element">3</li>
          <li className="element">4</li>
        </ul>
      </div>

      <div className="login/logout/register">
        {x===1?(
          <div className="login/register">
            
            </div>
        ):(
          <div className="logout">
            <p>Hello User</p>
          </div>
        )}
      </div>
    </div>
    <div className="homeMap"><Map/></div>
    </div>
  );
}


export default Home;