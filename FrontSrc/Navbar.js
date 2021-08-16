import logo from './logo.svg';
import './App.css';
import Logout from "./Logout";
import Main from './Main';
import Login from './Login';
import Register from './Registration';
import Profile from './Profile';
import Admin from './Admin';
import ProfileAdmin from './ProfileAdmin';
import Users from './Users';
import Foods from './Foods';
import Tables from './Tables'
import UserContext from './UserContext';
import DetailsTable from './DetailsTable';
import EditTable from './EditTable';
import sushi from './images/sush.png';
import DetailsOrder from './DetailsOrder';
import { Redirect } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React, { useState,useContext,useEffect } from 'react';
import Category from './Category';
import AdminTable from './AdminTable';
import DetailsCategory from './DetailsCategory';
import Chef from './Chef';
import DetailsChefTable from './DetailsChefTable';
import DetailsUser from './DetailsUser';
function Navbar({currentUser}){
  const {user,login,logout,profile} = useContext(UserContext);
  
  useEffect(()=>{
      profile();
    },[]);

    return <div> <nav >
       
 {user.role != '' ?

user.role[0].role == 'ROLE_СHEF'?(
    <div class="nav-wrapper" style = {{backgroundColor:'rgb(106, 29, 189)',fontSize:'24px'}}>
    <ul id="nav-mobile" class="left hide-on-med-and-down">
    <li> <img src = {sushi} style = {{marginLeft:'110px',marginTop:'16px'}}/></li>
    <li><a  href = '/' ><strong style = {{fontSize:'28px'}}>Mango</strong></a></li>
      </ul>
      <ul id="nav-mobile" class="right hide-on-med-and-down" style = {{marginRight:'120px',fontSize:'24px'}}>
        <li> {user.auth?<a  className="nav-link" href={`/tables`}>Tables</a>:<a className="nav-link" href={`/register`}>
         Register           
         </a>}</li>
         {user.role != '' ?

user.role[0].role == 'ROLE_СHEF'? <li><a href="/chef" >Chef</a></li>:<li></li> :
<li></li>}
        {user.role != '' ?

        user.role[0].role == 'ROLE_ADMIN'? <li><a href="/admin" >Admin</a></li>:<li></li> :
        <li></li>}

        
      
        <li> {user.auth?<a className="nav-link"  href={`/profile`}>{user.fullName}</a>:""}</li>
        
        <li>    {user.auth?<Logout/>:<a className="nav-link" href={`/login`}>Login</a>}</li>

      </ul>
    </div>):(
     <div class="nav-wrapper" style = {{backgroundColor:'rgb(215, 45, 45)',fontSize:'24px'}}>
     <ul id="nav-mobile" class="left hide-on-med-and-down">
     <li> <img src = {sushi} style = {{marginLeft:'110px',marginTop:'16px'}}/></li>
     <li><a  href = '/' ><strong style = {{fontSize:'28px'}}>Mango</strong></a></li>
       </ul>
       <ul id="nav-mobile" class="right hide-on-med-and-down" style = {{marginRight:'120px',fontSize:'24px'}}>
         <li> {user.auth?<a  className="nav-link" href={`/tables`}>Tables</a>:<a className="nav-link" href={`/register`}>
          Register           
          </a>}</li>
          {user.role != '' ?
 
 user.role[0].role == 'ROLE_СHEF'? <li><a href="/chef" >Chef</a></li>:<li></li> :
 <li></li>}
         {user.role != '' ?
 
         user.role[0].role == 'ROLE_ADMIN'? <li><a href="/admin" >Admin</a></li>:<li></li> :
         <li></li>}
 
         
       
         <li> {user.auth?<a className="nav-link"  href={`/profile`}>{user.fullName}</a>:""}</li>
         
         <li>    {user.auth?<Logout/>:<a className="nav-link" href={`/login`}>Login</a>}</li>
 
       </ul>
     </div>) :  (<div class="nav-wrapper" style = {{backgroundColor:'rgb(215, 45, 45)',fontSize:'24px'}}>
    <ul id="nav-mobile" class="left hide-on-med-and-down">
    <li> <img src = {sushi} style = {{marginLeft:'110px',marginTop:'16px'}}/></li>
    <li><a  href = '/' ><strong style = {{fontSize:'28px'}}>Mango</strong></a></li>
      </ul>
      <ul id="nav-mobile" class="right hide-on-med-and-down" style = {{marginRight:'120px',fontSize:'24px'}}>
        <li> {user.auth?<a  className="nav-link" href={`/tables`}>Tables</a>:<a className="nav-link" href={`/register`}>
         Register           
         </a>}</li>
         {user.role != '' ?
        user.role[0].role == 'ROLE_СHEF'? <li><a href="/chef" >Chef</a></li>:<li></li> :
        <li></li>}

        {user.role != '' ?
        user.role[0].role == 'ROLE_ADMIN'? <li><a href="/admin" >Admin</a></li>:<li></li> :
        <li></li>}

        
      
        <li> {user.auth?<a className="nav-link"  href={`/profile`}>{user.fullName}</a>:""}</li>
        
        <li>    {user.auth?<Logout/>:<a className="nav-link" href={`/login`}>Login</a>}</li>

      </ul>
    </div>)
}
</nav>
  <Switch>
  <Route path="/profile">
        <Profile/>
    </Route>
    <Route path ="/adminTable">
      <AdminTable/>
    </Route>
    <Route path="/tables">
        <Tables/>
    </Route>
    <Route path="/category">
        <Category/>
    </Route>
    <Route path="/admin">
        <Foods/>
    </Route>
    <Route path="/chef">
        <Chef/>
    </Route>
    <Route path="/register">
        <Register/>
    </Route>
    <Route path="/foods">
        <Foods/>
    </Route>
    <Route path="/users">
        <Users/>
    </Route>
    <Route path="/login">
    {user.auth?<Redirect to = "/"/>:<Login/> }
    </Route>
    <Route path="/profileAdmin">
      <ProfileAdmin/>
   </Route>
   
   <Route path="/detailsTable/:tableId">
      <DetailsTable/>
   </Route>
   <Route path="/detailsCategory/:categoryId">
      <DetailsCategory/>
   </Route>
   <Route path="/detailsUser/:userId">
      <DetailsUser/>
   </Route>
   <Route path="/detailsTableChef/:tableId">
      <DetailsChefTable/>
   </Route>
   <Route path="/editTable/:tableId">
      <EditTable/>
   </Route>
   <Route path="/detailsOrder/:orderId">
      <DetailsOrder/>
   </Route>
    <Route path="/">
        <Main/>
    </Route> 
</Switch>
<footer class="page-footer" style = {{backgroundColor:'#1e1e1e',marginTop:'140px'}}>
          <div class="container">
            <div class="row">
              <div class="col l6  s3">
                <h5 class="white-text " style = {{marginRight:'140px'}}>Mango Sushi</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3  " href="#!">Mango Sushi.Order delicious sushi from us</a></li>
                </ul> </div>
              <div class="col  s3">
                <h5 class="white-text">Contacts</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!"><strong>Order service</strong></a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">+7 (775) 007 06 69</a></li>
                  
                </ul>
              </div>
              <div class="col s3">
                <h5 class="white-text ">FAQ</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3  " href="#!">Feedback</a></li>
                  <li><a class="grey-text text-lighten-3 " href="#!">About Company</a></li>
                  <li><a class="grey-text text-lighten-3 " href="#!">Events</a></li>
                  
                </ul> </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2021 Mango Sushi
            
            </div>
          </div>
        </footer>
    </div>
}
export default Navbar;