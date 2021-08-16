import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import React from "react";
import ProfileAdmin from './ProfileAdmin';
import 'materialize-css/dist/css/materialize.min.css';

function Admin(params) {
    return <div className = "main-content"> 
    <Router>
 <div className = "row">
     <div className = "col s3" style = {{position:'absolute',backgroundColor:'black'}}>
     
                
     <div class="collection pd-5" style = {{border:'1px solid #000000',textAlign:'left',fontSize:'18px',marginTop:'50px'}}>
        <a href="/profileAdmin" class="collection-item" style = {{backgroundColor:'black'}}>Profile</a>
        <a href="/users" class="collection-item "style = {{backgroundColor:'black'}}>All Users</a>
        <a href="/foods" class="collection-item"style = {{backgroundColor:'black'}}>All Foods</a>
       
      </div>
   
   
     </div>
     <div className = "col s5" style = {{marginLeft:'250px'}}>
  
     <ul class="collection">
      <li class="collection-item">Alvin</li>
      <li class="collection-item">Alvin</li>
      <li class="collection-item">Alvin</li>
      <li class="collection-item">Alvin</li>
    </ul>
   

     </div>
 </div>
  <Switch>
  <Route path="/profileAdmin">
      <ProfileAdmin/>
   </Route>
  <Route path="/users">
  <ProfileAdmin/>
    </Route>
    <Route path="/foods">
    <ProfileAdmin/>
    </Route>
    
</Switch>
</Router>
</div>
}

export default Admin;
