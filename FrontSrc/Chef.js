import logo from './logo.svg';
import './App.css';
import M from 'materialize-css' ;
import React, { useState,useContext,useEffect } from 'react';
import UserContext from './UserContext';
import chef from './images/chef.png';
import smile from './images/smiling.png';
import love from './images/in-love.png';
import sad from './images/sad.png';
function Chef(params) {
    const {user,login,logout,profile} = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    const [data, setData] = useState([]);
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
        tableData.forEach(element => {
            if(!element.status){
             data.push(element);
            }
         }
        );
            
    }
    console.log(data);
    return <div >
        <div className ="row">
        <div class="card-panel"  style={{border:'3px solid #bfbfbf',margin:'12px',padding:'10px'}}>
            <div className ="row">
                <div className ="col s4">
                <h3 style ={{color:'#7b7b7b'}}><img style={{height:'80px',paddingTop:'20px'}} src={chef}></img> Chef:  <strong>{user.fullName}</strong> </h3>
                </div>
                <div className ="col s8">
                <hr style={{marginTop:'90px'}} /> 
                </div>
            </div>
           
        </div>
        </div>
<div className ="row">
    <div className ="col s3" style ={{marginLeft:'600px'}}>
        <div class="card-panel teal" >
        <ul class="collection-panel teal with-header"  style ={{color:'white'}}>
            <li class="collection-header"><h4>Orders:</h4></li>
            { data.length != 0 ? 
            
            data?.map(row=>(
            <li class="collection-item"><a href={`http://localhost:3000/detailsTableChef/` + row.id}  style ={{fontSize:'22px'}}>{row.name}</a></li>
        
            )):
            <div>
             <div className ="row">
                <img className ="center" src = {love} style ={{height:'100px'}}></img>
                 </div>
                 <div className ="row">
                 <h5 className="center">Orders haven't arrived yet...</h5>
                 </div>
            </div>
            }
        </ul>
      </div>
    </div>
    <div className ="col">
          
    </div>
</div>
    </div>
}
export default Chef;