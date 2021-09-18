import React from "react";




const Section = ({ title, children }) => (
  <div>
    <span>{title}</span>
    <div>{children}</div>
  </div>
);


export default Section;