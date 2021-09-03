import React from "react";
import "../STYLE/Home.css"
import Map from "../state/Map"

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
            {/* <a herf="">login</a>s */}
            </div>
        ):(
          <div className="logout">
            <p>Hello User</p>
          </div>
        )}
      </div>
    </div>
    <div className="home-map"><Map/></div>
    </div>
  );
}


export default Home;