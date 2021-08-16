import logo from './logo.svg';
import './App.css';
import React, { useState,useContext,useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import sushi1 from './images/sushi1.jpg';
import sushi2 from './images/sushi2.jpg';
import sushi3 from './images/sushi3.jpg';
import sushi7 from './images/sushi7.png';
import UserContext from './UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function ListFoods({searchName}) {
    const [data, setData] = useState([]);
    const [statusCard,setStatusCard] = useState(false);
    const {user,login,logout,profile} = useContext(UserContext);
    async function loadData() {
        let jwt = localStorage.getItem('jwtToken');
        console.log(jwt);
        let response = await fetch("http://localhost:8090/api/allCategories", {
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " +  jwt,
          }
        });
        let tableData = await response.json();
        setStatusCard(false);
    
        console.log(tableData);
        setData(tableData);
       
      }
    async function searchByName(name){
        let jwt = localStorage.getItem('jwtToken');
        console.log(name);
        if(name.length == 0){
            name = null;
            console.log(name);
          
          }
        if(jwt != null){
            let response = await fetch("http://localhost:8090/api/searchByFood/"+name, {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization":"Bearer " +  jwt,
                }
              });
              
              if(response != 'empty'){
                  let tableData = await response.json();
                  setStatusCard(true);
                  setData(tableData);
                  if(name  == null){
                  setStatusCard(false);
              
                  //  loadData();
                  }
              }
        }
       
       
        
    }
    useEffect(() => {
        console.log(searchName);
        searchByName(searchName);
        if(searchName == null){
        //  loadData();
          profile();
        }
      
      },[searchName])
    return <div>
{data.length != 0 ?  <div className="row">
        {data?.map(row=>(
             <div className="col s3" style={{paddingRight:'20px'}}>
                     <div className="card">
             <div className="card-content">
                 <div className="row">
                 <div className = "col s12">
                    <img height='200' style = {{height:'150px'}}  src={row.url}/>
                    </div>
                 </div>
                 <div className="card-action">
                    <a className = "btn"  href={`http://localhost:3000/detailsSearchCategory/` + row.id}>{row.name}</a>
                 </div>
                 </div>
             </div>
             </div>
            
        ))
        }
   {/*     { dataOrder.length != 0 ?
          
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
                        </div> 
                   
                       
                        </div>
                       
                    </div>
                </div> */}
    </div>:
    <div></div>}
    </div>
}
function CarouselMain(params) {
    const {user,login,logout,profile} = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    const [category,setCategory] = useState(0);
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.slider');
        var instances = M.Slider.init(elems, {});
        var elem = document.querySelectorAll('.tab');
        var instance = M.Tabs.getInstance(elem);
    });
    useEffect(() => {
            M.AutoInit();
          //  getCategories();
    })

      
return (<div class="slider">
        <ul class="slides">
        <script>
        {M.AutoInit()
    }
        </script>
       
    
        <li>
            <img src={sushi1}/> 
            <div class="caption left-align">
                <div className = "row" style = {{marginTop:'95px'}}>
                    <div className = "col-12">
                        <h3 style = {{backgroundColor:'rgb(59, 58, 57)',display:'inline',paddingInline:'20px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>WELCOME TO <strong style = {{color:'#5fc546'}}>MANGO</strong></h3>
                    </div>
                    <div className = "col-12">
                        <a className="btn" style = {{marginTop:'30px',backgroundColor:'#b71a25'}}>ORDER NOW</a>
                    </div>
                
                </div>
            </div>
        </li>
        <li>
            <img src={sushi3}/>
            <div class="caption center-align" >
            <h3 style = {{backgroundColor:'rgb(59, 58, 57)',display:'contents',paddingInline:'20px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}><strong style = {{color:'#b71a25'}}>JAPANESE</strong> RESTAURANT  <strong style = {{color:'#5fc546'}}> &</strong> SUSHI BAR</h3>
            <h5 class="light grey-text text-lighten-3"><a class="btn" style = {{marginTop:'170px',backgroundColor:'#b71a25'}}>ORDER NOW</a></h5>
            </div>
        </li>
        <li>
            <img src={sushi7}/> 
            <div class="caption right-align">
            <h3 style = {{backgroundColor:'rgb(59, 58, 57)',display:'inline',paddingInline:'20px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}><strong style = {{color:'#b71a25'}}>JAPANESE</strong> RESTAURANT <strong style = {{color:'#5fc546'}}> &</strong> SUSHI BAR</h3>
                
            <h5 class="light black-text text-lighten-3"> <a class="btn mt-6" style = {{backgroundColor:'#b71a25',marginTop:'20px'}}>ORDER NOW</a></h5>
            </div>
        </li>
        <li>
            <img src={sushi2}/> 
            <div class="caption center-align">
            
            </div>
        </li>
        
       
        </ul>
    </div>)
}

function Main(params) {
    const {user,login,logout,profile} = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    const [category,setCategory] = useState([]);
    const [foods,setFoods] = useState([]);
    const [searchName,setSearchName] = useState("");
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.slider');
        var instances = M.Slider.init(elems, {});
        var elem = document.querySelectorAll('.tab');
        var instance = M.Tabs.getInstance(elem);
    });
    useEffect(() => {
            M.AutoInit();
            getCategories();
    })

    
    async function getCategories(){

        if(jwt != null){
            const response = await fetch("http://localhost:8090/api/allCategories", {
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
       
        
    }       
    const handleSearchNameChange = event =>{
        setSearchName(event.target.value);
     
    }
    return <div className = "container mt-3" style = {{marginTop:'50px'}}>
       <div className = "row mt-5">
           <CarouselMain/>
           </div>
    <br/>
    <div className ="row">
    {user.role != '' ?

        user.role[0].role == 'ROLE_СHEF'? 
        <nav style={{backgroundColor:'rgb(106, 29, 189)'}}>
            <div class="nav-wrapper">
            <form>
                <div class="input-field">
                <input id="search" type="search"  value = {searchName} onChange = {handleSearchNameChange}  required />
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
                </div>
            </form>
            </div>
        </nav>
        :
        <nav style={{backgroundColor:'rgb(215, 45, 45)'}}>
            <div class="nav-wrapper">
            <form >
                <div class="input-field">
                <input id="search" type="search" value = {searchName} onChange = {handleSearchNameChange} required />
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
                </div>
            </form>
            </div>
        </nav>
        :<div></div>}
    </div>
    <ListFoods searchName = {searchName}/>
    <div className="card-deck" style = {{display:'flex'}}>
        {foods?.map(row=>(
             <div className="col s4">
             <div className="card">
                 <div className="card-image">
                    <img className="circle responsive-img" src={row.url}/>
                 </div>
                 <div className="card-action">
                    <a href={`http://localhost:3000/detailsSearchCategory/` + row.id}>{row.name}</a>
                 </div>
             </div>
             </div>
        ))
        }
   
    </div>
    <div className="row">
    {category.length == 0?  <div>
        <div className="card-deck" style = {{display:'flex'}}>
            <div className="col s4">
                <div className="card">
                    <div class="card-image">
                    <img src="https://www.royalsushionline.com/wp-content/uploads/2015/07/sushi-sashimi-picture-a.jpg"/>
    
                    </div>
                    
                    <div class="card-action">
                    <a href="#">SushiRitto</a>
                    </div>
                </div>
            </div>
            <div className="col s4">
            <div class="card">
                <div class="card-image">
                <img src="https://102922.selcdn.ru/nomenclature_images/61d86f73-cc5a-11e8-80d5-d8d385655247/9f524dd6-e388-4f54-8011-632bbbdc68cf.jpg"/>
               
                </div>
                
                <div class="card-action">
                <a href="#">Sets of sushi</a>
                </div>
            </div>
            </div>
            <div className="col s4">
            <div class="card">
                <div class="card-image">
                <img src="http://s1.1zoom.net/big0/257/Fast_food_Pizza_486393.jpg"/>
        
                </div>
              
                <div class="card-action">
                <a href="#">Pizza</a>
                </div>
            </div>
            </div>
            </div>
            <div className="col s4">
            <div class="card">
                <div class="card-image">
                <img src="https://ekorekom.com/wp-content/files/2020/04/Salads_Vegetables_Pepper_Lemons_White_background_543226_1280x944.jpg"/>
               
                </div>
            
                <div class="card-action">
                <a href="#">Salads</a>
                </div>
            </div>
            </div>
            <div className="col s4">
            <div class="card">
                <div class="card-image">
                <img src="https://s1.1zoom.me/big7/969/Sweets_Ice_cream_489487.jpg"/>
           
                </div>
               
                <div class="card-action">
                <a href="#">Desserts</a>
                </div>
            </div>
            </div>
           
         
    </div>:  <div>
    <div className="card-deck" style = {{display:'flex'}}>
        {category?.map(row=>(
             <div className="col s4">
             <div className="card">
                 <div className="card-image">
                    <img className="circle responsive-img" src={row.url}/>
                 </div>
                 <div className="card-action">
                    <a href={`http://localhost:3000/detailsSearchCategory/` + row.id}>{row.name}</a>
                 </div>
             </div>
             </div>
        ))
        }
   
    </div>
    </div>}
      
  </div>
  </div>
   

}

export default  Main;

