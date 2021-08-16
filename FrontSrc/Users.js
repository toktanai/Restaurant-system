import logo from './logo.svg';
import './App.css';
import M from 'materialize-css' ;
import React, { useState,useContext,useEffect } from 'react';
import UserContext from './UserContext';
function Users(params) {
  const {user,login,logout,profile} = useContext(UserContext);
  let jwt = localStorage.getItem('jwtToken');
  const [users, setUsers] = useState([]);

  useEffect(()=>{
      profile();
      getUsers();
    },[]);

    async function getUsers(){

      const response = await fetch("http://localhost:8090/api/getAllUsers", {
          headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt,
          }
      });
      if(response.status==200){
      let data = await response.json();
      setUsers(data);  
      
  }else{
      console.log("empty");
  }
      
 }
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
    <div className = "col s10" style = {{marginLeft:'250px'}}>
      <div className ="row">
        <h4 className ="left-align" style = {{marginLeft:'150px'}}><strong>Users</strong></h4>
        <hr  style = {{marginLeft:'150px'}}></hr>
      </div>
          <div class="row" style = {{marginTop:'40px'}}>
                <div class="col s10" style = {{marginLeft:'150px'}}>
                  <table className = "striped"style = {{marginBottom:'180px'}} >
                <thead>
                  <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Full Name</th>
                      <th>Password</th>
                      <th></th>
                  </tr>
                </thead>

                <tbody>
                {users?.map(row=>(
                  <tr>
                    {row.id != user.id ?
                    <td>{row.id}</td> : <td><h6 hidden={row.id != user.id} style={{color:'black'}} ><strong>You are</strong></h6></td>}
                    <td>{row.email}</td>
                    <td>{row.fullName}</td>
                    <td>{row.password}</td>
                    <td><a href = {`http://localhost:3000/detailsUser/` + row.id} className="btn grey" >Details</a></td>
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

export default Users;