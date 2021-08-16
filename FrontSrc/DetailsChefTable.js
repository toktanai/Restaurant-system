import logo from './logo.svg';
import './App.css';
import M from 'materialize-css' ;
import React, { useState,useContext,useEffect } from 'react';
import {useParams} from "react-router-dom";
import UserContext from './UserContext';
import chef from './images/chef.png';
import smile from './images/smiling.png';
import sad from './images/sad.png';
import { getDefaultNormalizer } from '@testing-library/dom';
function DetailsChefTable(params) {
    const {user,login,logout,profile} = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    let {tableId} = useParams();
    const [data, setData] = useState([]);
    const [table, setTable] = useState([]);
    const [done,setDone] = useState(false);
    const [order, setOrder] = useState({id:0,status:'',foods:[],tables:[],amount:0});
    const [dataOrder, setDataOrder] = useState([]);
    const [clicked,setClicked] = useState(0);
    useEffect(()=>{
        profile();    
        allTable();
        getTable(tableId);
        getOrders();
      },[clicked]);
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, []);
    });
    console.log(clicked);
    async function allTable(){
        // console.log(data);
        const response = await fetch("http://localhost:8090/api/tables", {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " +  jwt,
            }
        });
        
        let tableData = await response.json(); 
       // setClicked(true);  
        setData(tableData);     
    }
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
        
           
        }else{
            console.log("empty");
           // setMessage("404 ITEM NOT FOUND");
        }
    }
    async function getOrders(){
        const response = await fetch("http://localhost:8090/api/getTableOrder", {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " +  jwt,
              }
        });
        if(response.status==200){
           let data = await response.json();
           data.forEach(element => {
               if(element.tables.id == tableId){
               if(!element.status){
                dataOrder.push(element);
               }
            }
           });
          // setDataOrder(data);  
           
       }else{
           console.log("empty");
       }
     
        
   }
   async function editOrder(data){
       
    console.log(data);
    const response = await fetch("http://localhost:8090/api/saveOrder", {
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
    setClicked(clicked+1);

}

    const handleOrderChange = (event) => {
        let value =(event.target.value);
        let name = event.target.name;
        setDone(!value);
        console.log(value);
   
        setOrder((prevalue) => {
        return {
            ...prevalue,            
            [name]: value
        }
        })
    }
   const handleSubmitEdit = event =>{
    console.log(done);
    var id = order.id;
    var status = !done;
    var foods = order.foods;
    var tables = order.tables;
    var amount = order.amount;
    var input = {id,status,foods,tables,amount};
    editOrder(input);
    setClicked(clicked+1);
    M.toast({html: 'Order updated!'});
  //  event.preventDefault();
}
console.log(dataOrder);
    return <div >
     
        <div className ="row">
        <div class="card-panel"  style={{border:'3px solid #bfbfbf',margin:'12px',padding:'10px'}}>
            <div className ="row">
                <div className ="col s4">
                <h3 style ={{color:'#7b7b7b'}}><img style={{height:'80px',paddingTop:'20px'}} src={chef}></img> Chef:  <strong>{user.fullName}</strong></h3>
                </div>
                <div className ="col s8">
                    <hr style={{marginTop:'190px'}} /> 
                </div>
            </div>
           
        </div>
        </div>
<div className ="row">
    <div className ="col s2" style={{marginLeft:'200px'}}>
        <div class="card-panel" style={{backgroundColor:'#3f0084'}}>
            <ul class="collection with-header"  style ={{color:'white',backgroundColor:'#3f0084',border:'0px'}}>
                <li class="collection-header" style={{border:'0px',backgroundColor:'#3f0084'}}><h4>Orders:</h4></li>
                {data?.map(row=>(
                    !row.status?
                <li class="collection-item" style={{backgroundColor:'#3f0084',border:'0px'}}><a  href={`http://localhost:3000/detailsTableChef/` + row.id}  style ={{fontSize:'22px'}}>{row.name}</a></li>:
                <li></li>
                ))}
            </ul>
        </div>
    </div>
    <div className ="col">
      
       
            { dataOrder.length != 0 ?
          
            dataOrder?.map(row=>(
           
            <div className="card" hidden = {row.tables.id != tableId} key = {row.id}>
                <div className="card-content">
                    <div className = "row">
                        <div className = "col s6">
                                <img style = {{height:'200px'}} src={row.foods.url}></img>
                        </div>
                        <div className = "col s6">
                            <h4 className = "left-align" >Food: {row.foods.name}</h4>
                            <div class="chip" >
                                {row.foods.categories.name}
                                <i class="close material-icons">close</i>
                            </div>
                            <div class="chip" style = {{marginRight:'50px'}}>
                                {row.foods.price} tg
                                <i class="close material-icons">close</i>
                            </div>
                            <hr></hr>
                            <p  className = "left-align">Amount: {row.amount} </p>
                            <br></br>
                            <button onClick={()=>setOrder(row)} data-target="modal" type="button" className="btn modal-trigger right">COOK</button>
                        </div>
                        <div className = "col s2">
                        {/* <div class="switch" style = {{fontSize:'-webkit-xxx-large'}} >
                            <label>
                            
                            <input type="checkbox" checked ={row.status}/>
                            <h4 class="lever"></h4>
                            Ready
                            </label>
                        </div> */}
                   
                       
                        </div>
                       
                    </div>
                </div>
          
              
            </div>
             )):<div>
                 <div className ="row">
                <img className ="center" src = {sad} style ={{height:'100px',marginLeft:'310px'}}></img>
                 </div>
                 <div className ="row">
                 <h5 className="center"  style ={{marginLeft:'310px'}}>Orders haven't arrived yet...</h5>
                 </div>
                </div>}
            
        <br></br>
        
    
        {order.foods.name == ' '?
         <div id="modal"  class="modal" style={{width:'450px'}}>
            <form className="center" onSubmit={handleSubmitEdit}>
                <div class="modal-content" style={{paddingBottom:'0px'}}>
                <h2>Cooking</h2>
                </div>
                <div class="modal-content" style={{paddingBottom:'0px'}}>
                <div class="row">
                    <div class="col s5">
                    <h3 style={{paddingTop:'20px'}}>{order.foods.categories.name}: <strong>{order.foods.name}</strong></h3> 
                    <img style={{height:'200px'}} src={order.foods.url}></img>    
                    </div>
                    <div class="col s7">
                    <div class="switch" style = {{fontSize:'-webkit-xxx-large'}} >
                            <label style={{fontSize:'22px'}}>
                            Ready
                            <input type="checkbox"  value={order.status}   onChange={handleOrderChange} name="status"/>
                            <h4 class="lever" ></h4>
                           
                            </label>
                        </div>         
                    </div>
                </div>
                </div>
                <div class="modal-content">
                    <button className="btn" type="submit">Ready Cook!</button>
                    </div>
            </form>
        </div>
        :<div id="modal"  class="modal" style={{width:'450px'}}>
        <form className="center" onSubmit={handleSubmitEdit}>
            <div class="modal-content" style={{paddingBottom:'0px'}}>
            <h2>Cooking</h2>
            <div class="row">
                <div class="col s5">
               
                 <h3 hidden={order.foods.name == ' '} style={{paddingTop:'20px'}}> Food: <strong>{order.foods.name}</strong> </h3>
                   
                <img style={{height:'200px'}} src={order.foods.url}></img>    
                </div>
                <div class="col s7">
                <div class="switch" style = {{fontSize:'-webkit-xxx-large'}} >
                        <label style={{fontSize:'22px'}}>
                        Ready
                        <input type="checkbox"  value={order.status}   onChange={handleOrderChange} name="status"/>
                        <h4 class="lever" ></h4>
                       
                        </label>
                    </div>         
                </div>
            </div>
            </div>
            <div class="modal-content">
                <button className="btn" type="submit">Ready Cook!</button>
                </div>
        </form>
    </div>}
                            
    </div>
</div>


    </div>
}
export default DetailsChefTable;