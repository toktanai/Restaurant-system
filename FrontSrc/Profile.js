import logo from './logo.svg';
import './App.css';
import React, { useState,useContext,useEffect } from 'react';
import UserContext from './UserContext';
import M from 'materialize-css' ;
function Profile(){

    const {user,login,logout,profile} = useContext(UserContext);
    const [id, setId] = useState();
    const [fullName, setFullName] = useState();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    let jwt = localStorage.getItem('jwtToken');
    useEffect(()=>{
        profile();
      },[]);
      M.updateTextFields();
    const handleNameChange = event =>{
       login(user.id,user.email,event.target.value);
       console.log(fullName);
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
        const inputData = {
            id:user.id,
            email:user.email,
            fullName:user.fullName
        };
       // login(id,user.email,fullName);
        console.log(inputData);
        saveUser(inputData);
    
        event.preventDefault();

    }
    async function saveUser(data){
        console.log(data);
        const response = await fetch("http://localhost:8090/api/saveUser", {
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
     
        M.toast({html: '<div >Data is updated!</div>'});
        

    }
    async function saveUserPassword(data){
        console.log(data);
        const response = await fetch("http://localhost:8090/api/updatePassword", {
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
        if(messData == "Password saved !"){
            
            M.toast({html: '<div >Password saved !</div>'});
            setPassword("");
            setNewPassword("");
            setRePassword("");
          
        }else{
            M.toast({html: '<div >Wrong Password !</div>'});
           
            setPassword("");
            setNewPassword("");
            setRePassword("");
           
        }
       // console.log(JSON.stringify(messData));
     
        console.log(messData);
    }
    const handlePasswordSubmit = event =>{
        const inputDate = {newPassword:newPassword,password:password}
        var correct = false;
        if(newPassword == rePassword){
            correct = true;
        }else{
            correct = false;
        }
        if(!correct){
            M.toast({html: '<div >Passwords is not equal!</div>'});

            setNewPassword("");
            setRePassword("");
        }else{
            saveUserPassword(inputDate);
        }
        
        event.preventDefault();
        console.log(newPassword)
       
    }
    return <div>
 <div class="row" style = {{marginTop:'40px'}}>
                    <div class="col s6" style = {{marginLeft:'560px'}}>
                    <div class="row">
                      <blockquote  style = {{borderLeft:'5px solid #b71a25'}}><h5 style = {{marginRight:'680px',color:'#163457'}}>Update Profile Data</h5></blockquote>  
                    </div>
                    <form onSubmit = {handleSubmit}>
                    
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'#b71a25'}}>email</i>
                            <input id="icon_prefix_emal" type="text" className="validate" value = {user.email} readOnly />
                            <label htmlFor="icon_prefix_emal">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'#b71a25'}} >lock</i>
                            <input id="icon_prefix" type="text" className="validate" value = {user.fullName} onChange = {handleNameChange}/>
                            <label htmlFor="icon_prefix">Full Name</label>
                            </div>
                        </div>
                            
                            <div class="row">
                            <button onclick="M.toast({html: 'I am a toast'})" class="btn waves-effect waves-red" style = {{marginLeft:'0px',backgroundColor:'#b71a25'}} type="submit" >UPDATE PROFILE<i class="material-icons right">refresh</i></button>
                            </div>
                    </form>
                        <div class="row">
                        <blockquote  style = {{borderLeft:'5px solid #b71a25'}}><h5 style = {{marginRight:'680px',color:'#163457'}}>Update Password</h5></blockquote>
                        </div>
                    <form onSubmit = {handlePasswordSubmit} >
                    
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
}
export default Profile;