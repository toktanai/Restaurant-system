import logo from './logo.svg';
import './App.css';
import M from 'materialize-css' ;
import React, { useState,useContext,useEffect } from 'react';

import UserContext from './UserContext';
function Category(params) {
    const {user,login,logout,profile} = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    const [categories, setCategories] = useState([]);
    const [category,setCategory] = useState({id:0,name:'',url:''});

    const [name,setName] = useState("");
    const [url,setUrl] = useState("");
    const [check,setCheck] = useState(0);
    useEffect(()=>{
        profile();
        getCategories();
        
      },[check]);
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, []);
    });
    M.updateTextFields();

    const handleCategoryName = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setCategory((prevalue) => {
          return {
            ...prevalue,            
            [name]: value
          }
        })
    }
    const handleName = event =>{
        setName(event.target.value);
    }
    const handleUrl = event =>{
        setUrl(event.target.value);
    }
    const handleSubmit = event =>{
        var input = {name,url};
        addCategory(input);
        
        M.toast({html: 'Category updated!'});
        event.preventDefault();
    }
    const handleSubmitEdit = event =>{
        var name = category.name;
        var url = category.url;
        var id = category.id;
        var input = {id,name,url};
        addCategory(input);
        
        M.toast({html: 'Category updated!'});
        event.preventDefault();
    }
    console.log(category);
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
    async function addCategory(data){
        console.log(data);
        const response = await fetch("http://localhost:8090/api/addCategory", {
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
    async function deleteCategory(data){
        const response = await fetch("http://localhost:8090/api/deleteCategory", {
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
        
        }else{
            alert("okay")
            console.log(data)
        }
      //setId(messData.id);
    }
    return <div> <div className = "row">
     <div className = "col s2" style = {{position:'absolute',backgroundColor:'#770101',height:'880px'}}>
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
                         <h4>Add New Category</h4>
                         <div class="row">
                            <div class="col s12">
                        
                                <div class="input-field col s12">
                                <i class="material-icons prefix">add_shopping_cart</i>
                                <textarea id="icon_prefix2" value={name} onChange={handleName}   class="materialize-textarea"></textarea>
                                <label for="icon_prefix2">Category's name</label>
                                </div>
                        
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                        
                                <div class="input-field col s12">
                                <i class="material-icons prefix">add_shopping_cart</i>
                                <textarea id="icon_prefix3"  value={url} onChange={handleUrl}  class="materialize-textarea"></textarea>
                                <label for="icon_prefix3">Picture's url</label>
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
                <h5 style ={{marginRight:'45px'}}><strong>Add Category</strong></h5>
                <hr style ={{width:'1350px'}}></hr>
            </div>
            
          </div>
            <div class="row" style = {{marginTop:'40px'}}>
                    <div class="col s10" style = {{marginLeft:'200px'}}>
                        <table className = "striped">
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Category name</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>

                        {categories?.map(row=>(
                            <tr>
                                <td>{row.name}</td>
                            <td><img  style = {{height:'150px'}} src ={row.url}></img></td>
                            <td><button onClick={()=>setCategory(row)} data-target="modal" type="button" className="btn green  modal-trigger" >EDIT</button></td>
                            <td><a href={`http://localhost:3000/detailsCategory/` + row.id} className="btn gray" >DETAILS</a></td>
                          
                            </tr>
                        ))}
                          <div id="modal" class="modal" style={{width:'450px'}}>
                          <form className="center" onSubmit={handleSubmitEdit}>
                            <div class="modal-content" style={{paddingBottom:'0px'}}>
                            <h4>Details Food</h4>
                                
                                        <div class="row">
                                            <div class="col s12">
                                        
                                                <div class="input-field col s12">
                                                <i class="material-icons prefix">add_shopping_cart</i>
                                                <textarea id="icon_prefix9" name="name" value={category.name} onChange={handleCategoryName} class="materialize-textarea"></textarea>
                                                <label for="icon_prefix9">Category name</label>
                                                </div>
                                        
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col s12">
                                        
                                                <div class="input-field col s12">
                                                <i class="material-icons prefix">add_shopping_cart</i>
                                                <textarea id="icon_prefix13"name="url" value={category.url} onChange={handleCategoryName} class="materialize-textarea"></textarea>
                                                <label for="icon_prefix13">Category picture</label>
                                                </div>
                                        
                                            </div>
                                        </div>
                                
                            </div>
                            <div class="modal-footer">
                            <button type="submit" className="waves-green btn green">Edit</button>
                            <a href="" className="modal-close waves-effect waves-gray btn grey left">Cancel</a>
                            </div>
                            </form>
                          </div>
                        </tbody>
                        </table>
                </div>
            </div>
        </div>
    </div>
   </div>
}
export default Category;