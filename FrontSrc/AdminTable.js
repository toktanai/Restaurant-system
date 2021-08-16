import logo from './logo.svg';
import './App.css';
import M from 'materialize-css' ;
import React, { useState,useContext,useEffect } from 'react';
import UserContext from './UserContext';
function AdminTable(params) {

    const {user,login,logout,profile} = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    const [data, setData] = useState([]);
    const [check,setCheck] = useState(0);

    const [name,setName] = useState("");
    const [status,setStatus] = useState(true);
    useEffect(()=>{
        profile();
        allTable();
      },[check]);

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, []);
    });

    const handleName = event =>{
        setName(event.target.value);
    }
   
    const handleSubmit = event =>{
        var input = {name,status};
        addTable(input);
        
        M.toast({html: 'Table added!'});
        event.preventDefault();
    }

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

    async function addTable(data){
        console.log(data);
        const response = await fetch("http://localhost:8090/api/addTable", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " +  jwt,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        setCheck(check+1);
    }

    async function deleteTable(data){
        const response = await fetch("http://localhost:8090/api/deleteTable", {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " +  jwt
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        if(response.status==200){
        //let messData = await response.json();
        setCheck(check+1);
        }else{
            alert("okay")
        }
      //setId(messData.id);
    }
    return <div> <div className = "row">
     <div className = "col s2" style = {{position:'absolute',backgroundColor:'#770101',height:'675px'}}>
     <h5 style={{color:'white'}}>Admin Panel</h5>
                
     <div class="collection pd-5" style = {{border:'1px solid #770101',textAlign:'left',fontSize:'18px',marginTop:'50px'}}>
     <a href="/users" class="collection-item "style = {{backgroundColor:'#770101'}}>Users</a>
       <a href="/foods" class="collection-item"style = {{backgroundColor:'#770101'}}>Menu</a>
       <a href="/category" class="collection-item"style = {{backgroundColor:'#770101'}}>Categories</a>
       <a href="/adminTable" class="collection-item"style = {{backgroundColor:'#770101'}}>Tables</a>
      </div>
   
   
     </div>
    <div className = "col s10" style = {{marginLeft:'250px'}}>
        <br/>
    <div className="row">
            <div className ="col s1">
                    <a href="#modal2" className="btn-floating btn-large waves-effect red modal-trigger"><i className="material-icons">add</i></a>
            </div>
              <div id="modal2" className="modal">
              <form onSubmit ={handleSubmit}>
                   <div class="modal-content">
                         <h4>Add New Table</h4>
                         <div class="row">
                            <div class="col s12">
                        
                                <div class="input-field col s12">
                                <i class="material-icons prefix">add_shopping_cart</i>
                                <textarea id="icon_prefix2" value={name} onChange={handleName}   class="materialize-textarea"></textarea>
                                <label for="icon_prefix2">Category's name</label>
                                </div>
                        
                            </div>
                        </div>
                    </div>
                <div class="modal-footer">
                    <button type="submit" class="modal-close waves-effect waves-green btn-flat right green">Add</button>
                
                </div>
                </form>
               </div>
            
            <div className ="col s2">
                <h5 style ={{marginRight:'45px'}}><strong>Add Table</strong></h5>
                <hr style ={{width:'1350px'}}></hr>
            </div>
            
          </div>
            <div class="row" style = {{marginTop:'40px'}}>
                    <div class="col s10" style = {{marginLeft:'200px'}}>
                        <table className = "striped">
                        <thead>
                            <tr>
                                <th>Table name</th>
                                <th>Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                        {data?.map(row=>(
                            <tr>
                                <td style={{width:'250px'}}>{row.name}</td>
                                {row.status?<td style={{width:'250px'}}>True</td>:<td style={{width:'250px'}}>False</td>}
                                <td><a className="btn grey" >Details</a></td>
                                <td><a onClick ={()=>deleteTable(row)} className="modal-close waves-effect waves-green btn red" >Delete</a></td>
                                
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
export default AdminTable;