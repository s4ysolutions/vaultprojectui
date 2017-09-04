import React from "react";
import { Route, Link } from "react-router-dom";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";


const C1 = ()=> <div>1</div>;
const C2 = ()=> <div>2</div>;

const App = ()=> 
  <Grid container>
    <Typography type="title" gutterBottom>
  Hi2!
    </Typography>
    <ul>
      <li> <Link to="1">1</Link></li>
      <li> <Link to="2">2</Link></li>
    </ul>
    <hr/>
    <Route path="/1" component={C1}/>
    <Route path="/2" component={C2}/>
  </Grid> ;

export default App;
