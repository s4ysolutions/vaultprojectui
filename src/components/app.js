import React from "react";
import { Route, Link } from "react-router-dom";

const C1 = ()=> <div>1</div>;
const C2 = ()=> <div>2</div>;
const App = ()=> 
  <div>
    <h1>Hi1!</h1>
    <ul>
      <li> <Link to="1">1</Link></li>
      <li> <Link to="2">2</Link></li>
    </ul>
    <hr/>
    <Route path="/1" component={C1}/>
    <Route path="/2" component={C2}/>
  </div>;

export default App;
