import React from "react";
import ReactDOM from "react-dom";

console.log("index");
const Index = ()=>
  <div>
 Hi!
  </div>;

export default Index;

const render = Component => { ReactDOM.render(
  <Component/>,
  document.getElementById("reactMount")
);};

render(Index);
