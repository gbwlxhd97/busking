import React from "react";
import "./style/Message.css"



const Message = ({ text }) => (
  
  <div className="msg-container">
      <span className="msg"> {text} </span>
  </div>
  
);



export default Message;