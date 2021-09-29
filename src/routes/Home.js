import React from "react";
import Map from '../Components/Map';
import { Link,useHistory } from 'react-router-dom';
import "./style/Home.css"

function Home() {
  const saveToken = localStorage.getItem('token');
  const history = useHistory()
  function logout() {
    localStorage.clear(saveToken);
    history.push('/')
  }
  
  
  return (
    <div>    
      
    <div className="header">
      <div className="logo">
         LOGO
      </div>

      <div className="function">
        <ul>
          <li className="element">
          <Link to="/reservation">Music Reservation</Link>
            </li>
          <li className="element">2</li>
          <li className="element">3</li>
          <li className="element">4</li>
        </ul>
      </div>

      <div className="login/logout/register">
        {!saveToken?(
          <div className="login/register">
            <Link to="/login" className="loginPage">login</Link>
            </div>
        ):(
          <div className="logout">
            <p>Hello User</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
    <div className="homeMap">
      <Map/>
      </div>
      
    </div>
    
  );
}


export default Home;