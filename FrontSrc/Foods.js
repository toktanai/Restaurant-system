import logo from './logo.svg';
import './App.css';
import M from 'materialize-css' ;
import React, { useState,useContext,useEffect } from 'react';
import UserContext from './UserContext';

function Foods(params) {
  const {user,login,logout,profile} = useContext(UserContext);
  let jwt = localStorage.getItem('jwtToken');
  const [foods, setFoods] = useState([]);
  useEffect(()=>{
      profile();
      getFoods();
    },[]);
    async function getFoods(){
        
      const response = await fetch("http://localhost:8090/api/allFoods", {
          headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt,
            }
      });
      if(response.status==200){
         let data = await response.json();
         setFoods(data);  
       
     }else{
         console.log("empty");
    
     }
   
      
 }
    return <div> <div className = "row">
    <div className = "col s2" style = {{position:'absolute',backgroundColor:'#770101',height:'2008px'}}>
     <h5 style={{color:'white'}}>Admin Panel</h5>
                
     <div class="collection pd-5" style = {{border:'1px solid #770101',textAlign:'left',fontSize:'18px',marginTop:'50px'}}>
     <a href="/users" class="collection-item "style = {{backgroundColor:'#770101'}}>Users</a>
       <a href="/foods" class="collection-item"style = {{backgroundColor:'#770101'}}>Menu</a>
       <a href="/category" class="collection-item"style = {{backgroundColor:'#770101'}}>Categories</a>
       <a href="/adminTable" class="collection-item"style = {{backgroundColor:'#770101'}}>Tables</a>
      </div>
   
   
   
     </div>
    <div className = "col s10" style = {{marginLeft:'250px'}}>
    <div className ="row">
        <h4 className ="left-align" style = {{marginLeft:'150px'}}><strong>Menu</strong></h4>
        <hr  style = {{marginLeft:'150px'}}></hr>
      </div>
    <div class="row" style = {{marginTop:'40px'}}>
                   <div class="col s10" style = {{marginLeft:'200px'}}>
    <table className = "striped">
       <thead>
         <tr>
             <th>Food Name</th>
             <th>Picture</th>
             <th>Category</th>
             <th>Fill/Empty</th>
             <th>Price</th>
             <th></th>
         </tr>
       </thead>

       <tbody>
       {foods?.map(row=>(
         <tr>
           <td>{row.name}</td>
           <td><img  style = {{height:'150px'}} src ={row.url}></img></td>
           <td>{row.categories.name}</td>
           {row.status?<td style={{width:'250px'}}>Reserved</td>:<td style={{width:'250px'}}>Empty</td>}
          <td>{row.price} tg</td>  
          <td><a className="btn grey" >Details</a></td>           
         </tr>
       ))}
       </tbody>
     </table>
           </div>
           </div>
        </div>
    </div>
   </div>
}
export default Foods;