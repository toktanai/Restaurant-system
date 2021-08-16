import logo from './logo.svg';
import './App.css';
import React, { useState,useContext,useEffect } from 'react';
import {useParams} from "react-router-dom";
import M from 'materialize-css' ;
import UserContext from './UserContext';
import minus from "./images/minus.png";
import plus from "./images/plus.png";
import style from './style.css';
function Total({total}) {
    return(
        <h4 className ="left-align">Basket:<label style ={{fontSize:'25px'}}> {total} tg</label> </h4>
    )
}

function DetailsTable() {
    let {tableId} = useParams();
   
    const {user,login,logout,profile} = useContext(UserContext);
    const [tables, setTables] = useState([])
    const [dataOrder, setDataOrder] = useState([]);
    const [categories,setCategories] = useState([]);
    const [food,setFood] = useState([]);
    const [amount,setAmount] = useState(0);

    const [category,setCategory] = useState(0);
    const [foodTable,setFoodTable] = useState(0);

    const [order,setOrder] = useState([]);
    const [foods,setFoods] = useState([]);
    const [status,setStatus] = useState(false);
   
    const [check,setCheck] = useState(0);
    const [reserve,setReserve] = useState(false);
    let jwt = localStorage.getItem('jwtToken');
    
    

    useEffect(()=>{
        profile();  
        getTable(tableId);
        getOrders();
        getFoods();
        getCategories();
      },[check]);
   
    const handleCategoryChange = event =>{
        setCategory(event.target.value);
    }
    const handleFoodChange = event =>{
        setFoodTable(event.target.value);
        getFood(event.target.value);
        console.log(event.target.value);
    }
   
    const soldCheckbox = ({ target: { checked } }) => {
        console.log(reserve, checked);
        setReserve(checked);
      };
    const handleSubmitReserve = event =>{
        var id = tableId;
        var status = !reserve;
        var name = tables.name;
        var input ={id,name,status};
        saveTable(input);
        event.preventDefault();
    }
    const handleSubmit = event =>{
        const inputData = {status,foods,tables,amount}
        console.log(inputData);
        addOrder(inputData);
        setAmount(0);
        M.toast({html: 'Order added!'})
        event.preventDefault();
    }
    
    const handleClickPay = event =>{
        
        dataOrder.forEach(element => {
        
            if(element.tables.id == tableId){
                if(element.status){
                deleteTempOrder(element);
                }
            }
            
        });
        var name = tables.name;
        var status = true;
        var id = tableId;
        var input = {id,name,status};
        saveTable(input);
        console.log();
        setAmount(0);
        M.toast({html: 'Order deleted!'})
      
    }
    function handleClickMinus(e) {
        
        setAmount(amount - 1);
        
        e.preventDefault();
     
    }
    function handleClickPlus(e) {
        setAmount(amount + 1);
        e.preventDefault();
     
    }
    async function saveTable(data){
        console.log(data);
        const response = await fetch("http://localhost:8090/api/saveTable", {
        method: "PUT",
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
        let messData = await response.text();
        setCheck(check+1);
        M.toast({html: '<div >Table is updated!</div>'});
        

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
        setCheck(check+1);
        }else{
            alert("okay")
        }
      //setId(messData.id);
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
            setTables(data);
        
           
        }else{
            console.log("empty");
           // setMessage("404 ITEM NOT FOUND");
        }
    }
    async function getFood(foodId) {
        let response = await fetch("http://localhost:8090/api/getFood/"+foodId, {
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt
            }
          });
        if(response.status==200){
            let data = await response.json();
            setFoods(data);
            console.log(data);
           
        }else{
            console.log("empty");
           // setMessage("404 ITEM NOT FOUND");
        }
    }
    async function getOrder(orderId) {
        let response = await fetch("http://localhost:8090/api/getOrder/"+orderId, {
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer " +  jwt
            }
          });
        if(response.status==200){
            let data = await response.json();
            setOrder(data);
            console.log(data);
           
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
            
            setDataOrder(data);  
            
        }else{
            console.log("empty");
        }
      
         
    }
    async function getCategories(){
   
         const response = await fetch("http://localhost:8090/api/allCategories", {
             headers: {
                 "Content-Type": "application/json",
                 "Authorization":"Bearer " +  jwt,
               }
         });
         if(response.status==200){
            let data = await response.json();
            setCategories(data);  
          
        }else{
            console.log("empty");
        }
      
         
    }
    async function addOrder(data){
       
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
       
    //   let messData = await response.json();
       
      //  console.log(messData);
    
    
    }
    async function getFoods(){
        
         const response = await fetch("http://localhost:8090/api/allFoods", {
             headers: {
                 "Content-Type": "application/json",
                 "Authorization":"Bearer " +  jwt,
               }
         });
         if(response.status==200){
            let data = await response.json();
            setFood(data);  
          
        }else{
            console.log("empty");
       
        }
      
         
    }
    async function deleteOrder(data){
        const response = await fetch("http://localhost:8090/api/deleteOrder", {
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
    

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');

        var instances = M.Modal.init(elems, []);
        
    }); 
     
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, []);
    });

    return ( <div className = "container">
   
    
   <link rel={style}  />
   
        <br/>
         <div className="card" style ={{backgroundColor:'#d72d2d'}}>
            <div className="card-content">
            <div className = "row">
                <div className = "col">
                    <a href="#modalTable" class="left-align  modal-trigger" style ={{color:'white',fontSize:'44px'}}>{tables.name}</a>
                    {tables.status ? <h5 style = {{color:"#cecece"}}><i class="material-icons" style ={{fontSize:"20px",color:"green"}}>radio_button_checked</i> in progress</h5>:
                                 <h5 style = {{color:"#cecece"}}><i class="material-icons">cached</i>     Unpaid</h5>}
                 <div id="modalTable" className="modal" style ={{width:'430px'}}>
                    <form onSubmit={handleSubmitReserve}>
                        <div class="modal-content">
                            <h5>Details Table</h5>
                            <hr></hr>
                            <div class="row">
                                <div class="col s6">
                                    <h5  style={{paddingTop:'15px'}} value={tables.name} className="left-align" ><i class="material-icons prefix">add_shopping_cart</i>  {tables.name}</h5>
                                    
                                </div>
                                <div class="col s6">
                                <div class="switch right-align" style = {{fontSize:'-webkit-xxx-large'}} >
                                        <label>
                                        
                                        <input type="checkbox" checked={reserve} value={reserve}  onChange={soldCheckbox}/>
                                        <h4 class="lever"></h4>
                                        Reserved
                                        </label>
                                    </div>
                                </div>
                        </div>
                        <div className="row">
                        <button type="submit" class="modal-close waves-effect waves-green btn right">Edit</button>
                        </div>
                        </div>
                      
                    </form>
                </div>
                </div>
                <div className = "col">
                {!tables.status?<a href="#modal_check"  className = "btn right-align  modal-trigger" style ={{color:'white',marginLeft:'880px',fontSize:'20px',marginTop:'35px'}}>Get Bill</a>
                  :<div></div>} 
                   <div id="modal_check" class="modal">
                        <div class="modal-content">
                        <h4><strong>Your Bill:</strong></h4>
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Food Name</th>
                                <th>Quty</th>
                                <th>Price</th>
                                <th>General</th>
                               
                            </tr>
                            </thead>
                            <tbody>
                                
        {dataOrder?.map(row=>(
               row.status ?
                            <tr  hidden = {row.tables.id != tableId } key = {row.id}>
                                <td style = {{width:'150px'}}><img  style = {{height:'150px'}} src = {row.foods.url}></img></td>
                                <td >{row.foods.name}</td>
                                <td>{row.amount}</td>
                                <td>{row.foods.price}tg</td>
                                <td>{row.foods.price * row.amount} tg</td>
                            
                            </tr>
                            :<tr></tr>
               
             ))}
                            </tbody>
                        </table>
                        <br/>
                        <h5>Total to Pay: <strong>{dataOrder.reduce((a,c)=>(c.tables.id == tableId && c.status ? a+c.foods.price*c.amount:a),0)} TG</strong></h5>
                        </div>
                        <div class="modal-footer">
                        <a href="" class="modal-close waves-effect waves-grey  btn-large grey left">Back</a>
                        <a onClick ={()=>handleClickPay()} class="modal-close waves-effect waves-green  btn-large green right">Pay</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    
        <br/>
        <div className="row">
            <div className ="col s1">
                    <a href="#modal2" className="btn-floating btn-large waves-effect red modal-trigger"><i className="material-icons">add</i></a>
            </div>
              <div id="modal2" className="modal">
                   <div class="modal-content">
                        <h4>Order:</h4>
                        <label className="left-align" style={{marginRight:'970px',fontSize:'16px'}}>Category:</label>
                        <select className = "browser-default" onChange={handleCategoryChange}>
                            <option value="" disabled selected>Choose category:</option>
                            {categories?.map(row=>(
                                <option value={row.id} >{row.name}</option>
                            ))}
                        </select>
                        <br/>
                        <label className="left-align" style={{marginRight:'970px',fontSize:'16px'}}>Foods:</label>
                        <select className = "browser-default" onChange={handleFoodChange}>
                            <option value="" disabled selected>Choose foods:</option>
                            {food?.map(row=>(
                                row.categories.id == category ? 
                                //row.name == advs.category.name
                                <option value={row.id} >{row.name}</option>:
                               <div></div>
                            ))}
                        </select>
                        <br/>
                        {foods != '' ? 
                        <div>
                            <form onSubmit={handleSubmit}>
                           <div class="card">
                              <div class="card-content">
                                  <div className="row">
                                    <div className ="col">
                                        <img style ={{height:'200px'}} src={foods.url}></img>
                                    </div>
                                    <div className ="col">
                                        <h4 className="left-align">{foods.name}</h4>
                                        <strong><p className="left-align">{foods.description}</p></strong>
                                        <p className="left-align">Price:<strong>{foods.price}tg</strong></p>
                                        <div className ="row" style ={{marginLeft:'300px',paddingTop:'40px'}}>
                                            <div className ="col">
                                                {amount == 0?  <a  onClick={handleClickMinus} class="btn-floating disabled btn-large waves-effect waves-light white"><img style={{height:'40px',paddingTop:'15px'}} src={minus}></img></a>
                                            :  <a  onClick={handleClickMinus} class="btn-floating btn-large waves-light white"><img style={{height:'40px',paddingTop:'15px'}} src={minus}></img></a>
                                        }
                                               </div>
                                            <div className ="col">
                                            <p style ={{paddingTop:'20px'}}>{amount}</p>
                                            </div>
                                            <div className ="col">
                                            <a onClick={handleClickPlus} class="btn-floating btn-large waves-light white"><img style={{height:'40px',paddingTop:'15px'}} src={plus}></img></a>
                                           
                                             </div>
                                        </div>
                                    </div>
                                  </div>
                                  <div className = "row">
                                      <button className="btn green" type="submit"> Add to Basket</button>
                                  </div>
                                  
                             </div>   
                            </div>
                            </form>
                            </div>
                        
                        :<div></div>}
                                
                       
                   </div>
                <div class="modal-footer">
                    <a href={`http://localhost:3000/detailsTable/` + tableId} class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
               </div>
            
            <div className ="col s2">
                <h5 style ={{marginRight:'45px'}}>Add order</h5>
            </div>
            
          </div>
        <br/>
        <div className = "row">

        {dataOrder?.map(row=>(
             row.tables != null ? ( 
            <div className="card" hidden = {row.tables.id != tableId} key = {row.id}>
                <div className="card-content">
                    <div className = "row">
                    <div className = "col s3" style={{paddingRight:'75px'}}>
                            <img style = {{height:'200px'}} src={row.foods.url}></img>
                        </div>
                        <div className = "col s7">
                            <h4 className = "left-align" >{row.foods.categories.name}: <strong>{row.foods.name}</strong></h4>
                            <div class="chip" >
                                {row.foods.categories.name}
                                <i class="close material-icons">close</i>
                            </div>
                            <div class="chip" style = {{marginRight:'420px'}}>
                            {row.foods.price} tg
                                <i class="close material-icons">close</i>
                            </div>
                            <strong><p className = "left-align" style={{paddingBottom:'10px'}}>Amount: {row.amount}</p></strong>
                         
                            <hr></hr>
                            
                            <p  className = "right-align"><strong   style = {{fontSize:'20px',fontFamily:'cursive'}}>Price: {row.foods.price}.00 TG</strong> </p>
                        </div>
                        <div className = "col s2">
                        <div class="switch" style = {{fontSize:'-webkit-xxx-large'}} >
                            <label>
                            
                            <input type="checkbox" checked ={row.status}/>
                            <h4 class="lever"></h4>
                            Ready
                            </label>
                        </div>
                   
                       
                        </div>
                       
                    </div>
                </div>
                <div class="card-action">
                    <a  className = "btn white modal-trigger" style ={{color:'#26a69a',textDecoration:'underline'}} href={`http://localhost:3000/detailsOrder/` + row.id}>Details</a>
                    <a  onClick={()=>deleteOrder(row)}  className = "modal-close waves-effect waves-green btn-flat" style ={{color:'#26a69a',textDecoration:'underline'}} >Cancel Order</a>
                   
                </div>
                
            </div>
             ):<div></div>
        ))}
        </div>
        <div id="modalB" class="modal">
                   <div class="modal-content">
                        <h4>Details Order:</h4>
                        <div className="row">
                            <div className="col">

                            </div>
                            <div className="col">
                                
                            </div>
                        </div>
                        <a href={`http://localhost:3000/detailsTable/` + tableId} class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                
                    </div>
        </div>
        <div className = "row">
           <Total total = {dataOrder.reduce((a,c)=>(c.tables.id == tableId ? a+c.foods.price*c.amount:a),0)}/>     
        </div>
    </div>
    )
}

export default DetailsTable;