import logo from './logo.svg';
import './App.css';
import React, { useState,useContext } from 'react';
function ProfileAdmin(){
    const [id, setId] = useState();
    const [fullName, setFullName] = useState();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [message,setMessage] = useState("");
    const [success,setSuccess] = useState("");
    const [succes,setSucces] = useState("");

    
    const handleNameChange = event =>{
       // login(user.id,user.email,event.target.value);
       // console.log(fullName);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }
    const handleNewPasswordChange = event =>{
        setNewPassword(event.target.value);
    }
    const handleRePasswordChange = event =>{
        setRePassword(event.target.value);
        
    }
    const handleSubmit = event =>{
        console.log(fullName);
    //     const inputData = {
    //         id:user.id,
    //         email:user.email,
    //         fullName:user.fullName
    //     };
    //    // login(id,user.email,fullName);
    //     console.log(inputData);
    //     saveUser(inputData);
    
        event.preventDefault();

    }
    return <div>
        <div className = "row">
     <div className = "col s2" style = {{position:'absolute',backgroundColor:'black',height:'872px'}}>
     
                
     <div class="collection pd-5" style = {{border:'1px solid #000000',textAlign:'left',fontSize:'18px',marginTop:'50px'}}>
        <a href="/profileAdmin" class="collection-item" style = {{backgroundColor:'black'}}>Profile</a>
        <a href="/users" class="collection-item "style = {{backgroundColor:'black'}}>All Users</a>
        <a href="/foods" class="collection-item"style = {{backgroundColor:'black'}}>All Foods</a>
        <a href="/category" class="collection-item"style = {{backgroundColor:'black'}}>Categories</a>
       
      </div>
   
   
     </div>
     <div className = "col s10" style = {{marginLeft:'250px'}}>
  
    
     <div class="row" style = {{marginTop:'40px'}}>
                    <div class="col s10" style = {{marginLeft:'200px'}}>
                    <div class="row">
                      <blockquote  style = {{borderLeft:'5px solid #b71a25'}}><h5 style = {{marginRight:'850px',color:'#163457'}}>Update Profile Data</h5></blockquote>  
                    </div>
                    <form onSubmit = {handleSubmit}>
                        <div className = "row">
                            <div className = "alert alert-success" role="alert" hidden = {succes == ""}>
                                {succes}
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'#b71a25'}}>email</i>
                            <input id="icon_prefix_emal" type="text" className="validate" value = {""} />
                            <label htmlFor="icon_prefix_emal">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'#b71a25'}} >lock</i>
                            <input id="icon_prefix" type="password" className="validate" value = {password} onChange = {handlePasswordChange}/>
                            <label htmlFor="icon_prefix">Password</label>
                            </div>
                        </div>
                            
                            <div class="row">
                            <button class="btn waves-effect waves-light" style = {{marginLeft:'0px',backgroundColor:'#b71a25'}} type="submit" >UPDATE PROFILE<i class="material-icons right">refresh</i></button>
                            </div>
                    </form>
                        <div class="row">
                        <blockquote  style = {{borderLeft:'5px solid #b71a25'}}><h5 style = {{marginRight:'850px',color:'#163457'}}>Update Password</h5></blockquote>
                        </div>
                    <form >
                        <div className = "row">
                        <div className = "alert alert-danger" role="alert" hidden = {message == ""}>
                            {message}
                        </div>
                        <div className = "alert alert-success" role="alert" hidden = {success == ""}>
                            {success}
                        </div>
                        </div>
                        <div class="row" style = {{marginBottom:'0px'}}>
                            <div class="input-field col s6">
                            <i class="material-icons prefix" style = {{color:'#b71a25'}}>lock</i>
                            <input id="icon_prefix_password" type="password" class="validate" value = {password} onChange = {handlePasswordChange}/>
                            <label for="icon_prefix_password">Old Password</label>
                            </div>
                        </div>
                        <div class="row"  style = {{marginBottom:'0px'}}>
                            <div class="input-field col s6">
                            <i class="material-icons prefix" style = {{color:'#b71a25'}}>lock</i>
                            <input id="icon_prefix" type="password" class="validate" value = {newPassword} onChange = {handleNewPasswordChange}/>
                            <label for="icon_prefix">New password</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                            <i class="material-icons prefix" style = {{color:'#b71a25'}}>lock</i>
                            <input id="icon_prefix_repeat" type="password" class="validate" value = {rePassword} onChange = {handleRePasswordChange}/>
                            <label for="icon_prefix_repeat">Repeat new password</label>
                            </div>
                        </div>
                    
                        <div class="row">
                        <button class="btn waves-effect waves-light" style = {{marginLeft:'0px',backgroundColor:'#b71a25'}} type="submit" >UPDATE PASSWORD<i class="material-icons right">refresh</i></button>
                        </div>
                        </form>
                   </div>
            </div>

     </div>
 </div>
 
    </div>
}
export default ProfileAdmin;