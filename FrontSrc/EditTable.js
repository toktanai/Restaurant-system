import logo from './logo.svg';
import './App.css';
import React, { useState,useContext,useEffect } from 'react';
import {useParams} from "react-router-dom";
import M from 'materialize-css' ;
import UserContext from './UserContext';
import minus from "./images/minus.png";
import plus from "./images/plus.png";
import style from './style.css';
function EditTable(params) {
    let {tableId} = useParams();
   
    const {user,login,logout,profile} = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    const [table, setTable] = useState([])
    useEffect(()=>{
        profile();  
        getTable(tableId);
       
      },[]);


    async function getTable(tableId) {
        let response = await fetch("http://localhost:8090/api/getTable/"+tableId, {
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt
            }
          });
        if(response.status==200){
            let data = await response.json();
            setTable(data);
          console.log(data);
           
        }else{
            console.log("empty");
           // setMessage("404 ITEM NOT FOUND");
        }
    }
    return <div className ="container">
        <br/>
   <div class="card" style ={{backgroundColor:'#d72d2d'}}>
            <div class="card-content">
                <div className = "row">
                    <div className = "col s2">
                        <a href={`http://localhost:3000/editTable/` + table.id} class="left-align" style ={{color:'white',fontSize:'44px'}}>{table.name}</a>
                        
                    
                    </div>
                  
                  
                    <div className ="col s10">
                    <div className = "row">
                            <div class="switch right" style = {{fontSize:'-webkit-xxx-large'}} >
                                <label>
                                <strong style={{color:'#26a69a',fontSize:'19px'}}>Free</strong> 
                                
                                <input type="checkbox" />
                                <h4 class="lever"></h4>
                                <strong style={{color:'#26a69a',fontSize:'18px'}}>Occupied</strong> 
                                </label>
                            </div> 
                            </div>
                            <br/>
                            <div className = "row">
                            <button className="btn right">Update</button>
                            </div>
            
                    </div>
                        
                </div>
            </div>
        </div>
    </div>
}
export default EditTable;