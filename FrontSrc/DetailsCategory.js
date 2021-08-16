import logo from './logo.svg';
import './App.css';
import M from 'materialize-css' ;
import React, { useState,useContext,useEffect } from 'react';
import {useParams} from "react-router-dom";
import UserContext from './UserContext';

function DetailsCategory(params) {
    const {user,login,logout,profile} = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    let {categoryId} = useParams();
    const [categories, setCategory] = useState([]);
    const [foods,setFoods] = useState([]);
    const [dFood,setDFood] = useState([]);
    const [check,setCheck] = useState(0);

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState(0);
    const [url,setUrl] = useState("");

    
    useEffect(()=>{
        profile();
        getCategoriesFood();
        getCategory();
      },[check]);

    const handleNameChange = event =>{
        setName(event.target.value);
    }
    const handleDescriptionChange = event =>{
        setDescription(event.target.value);
    }
    const handlePriceChange = event =>{
        setPrice(event.target.value);
    }
    const handleUrlChange = event =>{
        setUrl(event.target.value);
    }
    const handleSubmit = event =>{
        var status = false;
        var input = {description,name,price,status,categories,url}
        addFood(input);
        M.toast({html: 'Food added!'});
        
        event.preventDefault();
    }

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');

        var instances = M.Modal.init(elems, []);
        
    }); 
    async function addFood(data){
       
        console.log(data);
        const response = await fetch("http://localhost:8090/api/addFood", {
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
    //   let messData = await response.json();
       
      //  console.log(messData);
    
    
    }
    async function getCategory(){

        const response = await fetch("http://localhost:8090/api/getCategory/" + categoryId, {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " +  jwt,
            }
        });
        if(response.status==200){
        let data = await response.json();
        setCategory(data);  
        }else{
            console.log("empty");
        }
    }
    async function getCategoriesFood(){

        const response = await fetch("http://localhost:8090/api/getCategoryFood/"+categoryId, {
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
    async function deleteFood(data){
        const response = await fetch("http://localhost:8090/api/deleteFood", {
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
        M.toast({html: 'Food deleted!'});
        setCheck(check+1);
        }else{
        M.toast({html: 'This is food reserved!'});
        }
      //setId(messData.id);
    }
    return <div className = "container">
   <br/>
         <div className="card" style ={{backgroundColor:'#d72d2d'}}>
            <div className="card-content">
                <div className ="row">
                    <div className ="col s2">
                    <img src={categories.url} alt="" class="circle responsive-img"/> 
                    </div>
                    <div className ="col s10">
                        <h2 className="left-align" style ={{color:'white'}}>{categories.name}</h2>
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
                  <form onSubmit = {handleSubmit}>
                   <div class="modal-content">
                         <h4>Add New Food</h4>
                                        <div class="row">
                                            <div class="col s12">
                                        
                                                <div class="input-field col s12">
                                                <i class="material-icons prefix">add_shopping_cart</i>
                                                <textarea id="icon_prefix2" value={name} onChange={handleNameChange}   class="materialize-textarea"></textarea>
                                                <label for="icon_prefix2">Food's name</label>
                                                </div>
                                        
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col s12">
                                        
                                                <div class="input-field col s12">
                                                <i class="material-icons prefix">add_shopping_cart</i>
                                                <textarea id="icon_prefix3"  value={description} onChange={handleDescriptionChange}  class="materialize-textarea"></textarea>
                                                <label for="icon_prefix3">Description</label>
                                                </div>
                                        
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col s12">
                                        
                                                <div class="input-field col s12">
                                                <i class="material-icons prefix">add_shopping_cart</i>
                                                <input id="icon_prefix4" type ="number" value={price} onChange={handlePriceChange}   class="materialize-input"></input>
                                                <label for="icon_prefix4">Price</label>
                                                </div>
                                        
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col s12">
                                                <div class="input-field col s12">
                                                <i class="material-icons prefix">add_shopping_cart</i>
                                                <textarea id="icon_prefix5"  value={url} onChange={handleUrlChange}  class="materialize-textarea"></textarea>
                                                <label for="icon_prefix5">Food's picture</label>
                                                </div>
                                        
                                            </div>
                                        </div>
                   </div>
                <div class="modal-footer">
                    <a href={`http://localhost:3000/detailsCategory/` + categoryId} class="modal-close waves-effect waves-green btn-flat left grey">Cancel</a>
                    <button type="submit" class="modal-close waves-effect waves-green btn-flat right green">Add</button>
                
                </div>
                </form>
               </div>
            
            <div className ="col s2">
                <h5 style ={{marginRight:'45px'}}>Add order</h5>
            </div>
            
          </div>
        <br/>
        <div className = "row">
        {foods?.map(row=>(
             row.categories != null ? ( 
        <div className="card" hidden = {row.categories.id != categoryId} key = {row.id} style ={{backgroundColor:'rgba(255, 255, 255, 0.62)'}}>
            <div className="card-content">
                <div className ="row">
                    <div className ="col s2">
                    <img src={row.url} alt="" class="circle responsive-img"/> 
                    </div>
                    <div className ="col s10">
                    <div className ="row">
                        <div className ="col s4">
                            <h4 className="left-align" style ={{color:'black'}}>{row.name}</h4>
                            <h5 className="left-align" style ={{color:'black'}}>{row.price} tg</h5>
                        </div>
                        <div className ="col s8">
                            <button onClick={()=>deleteFood(row)} style={{marginTop:'50px',marginRight:'50px'}} className ="btn red right">DELETE</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
             ):<div>111</div>))}
        </div>
    </div>
}

export default DetailsCategory;