import logo from './logo.svg';
import './App.css';
import React, { useState,useContext,useEffect } from 'react';
import UserContext from './UserContext';
import {useParams} from "react-router-dom";
import minus from "./images/minus.png";
import plus from "./images/plus.png";
import M from 'materialize-css' ;
function DetailsOrder() {
    const {user,login,logout,profile} = useContext(UserContext);  
    let jwt = localStorage.getItem('jwtToken');
    let {orderId} = useParams();
    const [clicked,setClicked] = useState(false);
    const [order,setOrder] = useState([]);
    const [amount,setAmount] = useState(0);
    useEffect(()=>{
      getOrder(orderId);
      profile();
      
      },[]);

console.log(order);
    function handleClickMinus(e) {
      setAmount(amount - 1);
      e.preventDefault();
    }
    function handleClickPlus(e) {
        setAmount(amount + 1);
        e.preventDefault();
     
    }
    function handleClickEdit(e) {
      
      var id = orderId;
      var status = order.status;
      var foods = order.foods;
      var tables = order.tables;
      
      var input ={id,status,foods,tables,amount};
      if(amount != 0){
        saveOrder(input);
      }else{
        deleteTempOrder(input);
      }
     
      e.preventDefault();
   
  }
  async function deleteTempOrder(data){
    console.log(data);
    const response = await fetch("http://localhost:8090/api/deleteTempOrder", {
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
    console.log(data);
    M.toast({html: '<div >Order deleted!</div>'});
    }else{
        alert("okay")
    }
  //setId(messData.id);
}
  async function saveOrder(data){
       
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
    M.toast({html: '<div >Order saved!</div>'});
        
   
//   let messData = await response.json();
   
  //  console.log(messData);


}
    const handleAmount = event =>{
      setAmount(event.target.value)
      
  }
  const clickButton = event =>{
    
    getOrder(orderId);
  
    event.preventDefault();
}
    async function getOrder(orderId) {
      console.log(orderId);
        let response = await fetch("http://localhost:8090/api/getOrder/"+orderId, {
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt
            }
          });
        if(response.status==200){
            let data = await response.json();
            setOrder(data);
           setAmount(data.amount);
            setClicked(true);
            console.log(data);
           
        }else{
            console.log("empty");
           // setMessage("404 ITEM NOT FOUND");
        }
    }
    return <div className="container">
      <br/>
      <h4 className="left-align">Details of order:</h4>
      <hr/>
      <br/>
     
      {clicked?<div className="row">
          <div className ="col s4">
         
     <img style={{height:'200px'}} src={order.foods.url} className="center"/>
          </div>
          <div className ="col s8">
            <h4 className="left-align">{order.foods.name}</h4>
            <strong><p className="left-align" >{order.foods.description}</p></strong>
            <p className="left-align" style={{fontSize:'20px'}}>Price:<strong>{order.foods.price}.00 TG</strong></p>
            <div className ="row" style ={{marginLeft:'200px',paddingTop:'0px'}}>
                                            <div className ="col">
                                                {amount == 0?  <a  onClick={handleClickMinus} class="btn-floating disabled btn-large waves-effect waves-light white"><img style={{height:'40px',paddingTop:'15px'}} src={minus}></img></a>
                                            :  <a  onClick={handleClickMinus} class="btn-floating btn-large waves-light white"><img style={{height:'40px',paddingTop:'15px'}} src={minus}></img></a>
                                        }
                                               </div>
                                            <div className ="col">
                                            <p style ={{paddingTop:'5px'}} value ={amount}>{amount}</p>
                                            </div>
                                            <div className ="col">
                                            <a onClick={handleClickPlus} class="btn-floating btn-large waves-light white"><img style={{height:'40px',paddingTop:'15px'}} src={plus}></img></a>
                                           
                                             </div>
                                             <div className ="col s8">
                                            <a onClick={handleClickEdit} href ={`http://localhost:3000/detailsTable/` + order.tables.id} class="btn btn-large">Update</a>
                                           
                                             </div>
                                        </div>
          </div>
        </div>:<div></div>}  
      </div>
}

export default DetailsOrder;