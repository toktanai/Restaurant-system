import logo from './logo.svg';
import './App.css';
import M from 'materialize-css' ;
import React, { useState,useContext,useEffect } from 'react';
import UserContext from './UserContext';
import {useParams} from "react-router-dom";
import chef from './images/chefPerson.png';
import waiter from './images/waiter.png';

function DetailsUser(params) {
    const {user,login,logout,profile} = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    let {userId} = useParams();
    const [userObject,setUser] = useState([]);
    const [roles,setRoles] = useState([]);
    const [role,setRole] = useState([]);
    const [roleName,setRoleName] = useState(0);
    const [check,setCheck] = useState(0);
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, []);
      });
    useEffect(()=>{
        profile();
        getUser(userId);
        getRoles();
        setNameRole();
      },[check]);
    
    const onClickSubmit = event =>{
        setCheck(check+1);
    }
    
   
    const handleRoleChange = event =>{
        setRoleName(event.target.value);
    }
    async function setNameRole(){
       
            roles.forEach(r => {
                if(userObject.roles[0].id == r.id){
                    setRole(r);
                }
            });
          
      
    }
    async function getRoles(){

        const response = await fetch("http://localhost:8090/api/getRoles", {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " +  jwt,
            }
        });
        if(response.status==200){
        let data = await response.json();
        setRoles(data);  
        }else{
            console.log("empty");
        }
    }
    async function getUser(userId){

        const response = await fetch("http://localhost:8090/api/getUserById/" + userId, {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " +  jwt,
            }
        });
        if(response.status==200){
        let data = await response.json();
        setUser(data);  
        }else{
            console.log("empty");
        }
    }
   
    console.log(roleName);
    
    return <div>
    <div className = "row">
        <div className = "col s2" style = {{position:'absolute',backgroundColor:'#770101',height:'720px'}}>
                <h5 style={{color:'white'}}>Admin Panel</h5>
                            
                <div class="collection pd-5" style = {{border:'1px solid #770101',textAlign:'left',fontSize:'18px',marginTop:'50px'}}>
                <a href="/users" class="collection-item "style = {{backgroundColor:'#770101'}}>Users</a>
                <a href="/foods" class="collection-item"style = {{backgroundColor:'#770101'}}>Menu</a>
                <a href="/category" class="collection-item"style = {{backgroundColor:'#770101'}}>Categories</a>
                <a href="/adminTable" class="collection-item"style = {{backgroundColor:'#770101'}}>Tables</a>
                </div>  
        </div>
        <div className ="col">
            <div className ="row">
               <div className = "col s7" >
                   <div className="row" style ={{marginLeft:'120px',marginTop:'30px'}} >
               {/* {userObject.roles != ' ' ?
                    userObject.roles[0].role == 'ROLE_СHEF'?
                        <img style={{height:'200px'}} src = {chef}></img>:
                        <img style={{height:'200px'}} src = {waiter}></img>:
                        <div></div>
                } */}
                  <h3 style ={{marginTop:'70px'}}>{userObject.fullName}</h3>
                  <button onClick = {onClickSubmit} className="btn-large red">Click!</button>
                  </div>
                </div> 
                <div className = "col s5" style ={{marginTop:'30px',fontSize:'24px'}} >
                  
                        <div className="row">
                            <div className="input-field col s12">
                            <i className="material-icons prefix" style={{borderBottom:'1px solid red'}} style = {{color:'#b71a25'}}>email</i>
                            <input id="icon_prefix_emal" type="text" style={{borderBottom:'1px solid red',fontSize:'24px'}} className="validate" value = {userObject.email} readOnly />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <i className="material-icons prefix" style = {{color:'#b71a25'}} >lock</i>
                            <input id="icon_prefix" type="text" className="validate" style={{borderBottom:'1px solid red',fontSize:'24px'}} value = {userObject.fullName} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <select className="browser-default" style={{fontSize:'18px',marginLeft:'30px'}} value={roleName} onChange={handleRoleChange}>
                            <option value ={role.id} selected>{role.role}</option>
    
                           { userObject.roles != ''?
                           
                            roles?.map(row=>(
                                   
                                <option value={row.id} hidden ={role.role == row.role}>
                                    {row.role}
                                </option>
                            ))
                            :<div></div>
}
                            </select>
                            </div>
                        </div>
                     
                </div> 
            </div>
        </div>
    </div>
</div>
}
export default DetailsUser;
