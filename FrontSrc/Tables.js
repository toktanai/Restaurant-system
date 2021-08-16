import logo from './logo.svg';
import './App.css';
import React, { useState,useContext,useEffect } from 'react';
import UserContext from './UserContext';
function Tables(params) {
    const {user,login,logout,profile} = useContext(UserContext);
    const [data, setData] = useState([]);
    let jwt = localStorage.getItem('jwtToken');
    useEffect(()=>{
        profile();
        allTable();
      },[]);

    async function allTable(){
       // console.log(data);
        const response = await fetch("http://localhost:8090/api/tables", {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " +  jwt,
              }
        });
        
        let tableData = await response.json();   
        setData(tableData);     
    }
    return (
    <div className = "container">
        <br/>
        <br/>
        <nav>
            <div class="nav-wrapper">
            <form>
                <div class="input-field" style={{backgroundColor:'white'}}>
                <input id="search" type="search" required value ="Search..."/>
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
                </div>
            </form>
            </div>
        </nav>
        <br/>
        <div className = "row">
        {data?.map(row=>(
            <div className = "col s3">
                    <div class="card">
                        <div class="card-content">
                            <div className = "row">
                                <div className = "col">
                                <h5 class="card-title left-align">{row.name}</h5>

                                {row.status ? <p style = {{color:"gray"}}><i class="tiny material-icons" style ={{fontSize:"11px",color:"green"}}>radio_button_checked</i>In progress</p>:
                                 <p style = {{color:"gray"}}><i class="tiny material-icons">cached</i>     Unpaid</p>
                                }
                                </div>
                                <div className = "col">
                                   <a href ={`http://localhost:3000/detailsTable/` + row.id}   className="btn center-align" style ={{marginTop:"20px",marginLeft:"55px"}}>Details</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-action"style = {{padding:"0 0 0 0"}}>
                            {row.status ?  <hr style = {{height:"5px",backgroundColor:"green",marginTop:'0px'}}></hr>:
                             <hr style = {{height:"5px",backgroundColor:"red",marginTop:'0px'}}></hr>}
                           
                        {/* <div class="switch" style={{marginRight:"65px"}}>
                                        <label>
                                        <a href="#" className ="left-align">status:</a>
                                        
                                        <input type="checkbox" checked = {row.status} />
                                        <span class="lever"></span>
                                        busy
                                        </label>
                                    </div>
                           
                         */}</div>
                    </div>
            </div>
        ))}
        </div>
  </div>
    )
}
export default Tables;