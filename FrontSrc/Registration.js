import logo from './logo.svg';
import './App.css';

import React, { useState,useContext } from 'react';
import M from 'materialize-css' ;
function Registration(){
    const [email, setEmail] = useState("");
    const [fullName,setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [message,setMessage] = useState("");
    const [success,setSuccess] = useState("");
    const [role,setRole] = useState(0);

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }
    const handleFullNameChange = event =>{
        setFullname(event.target.value);
    }
    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }
    const handleRePasswordChange = event =>{
        setRePassword(event.target.value);
    }

    const HandleRoleChange = event =>{
        setRole(event.target.value);
    }
    console.log(role);
    const handleSubmit = event =>{
        var roleId = role;
        const inputData = {email, password,fullName,roleId};
        console.log(inputData);
        if(password == rePassword){
           
            addUser(inputData);
            M.toast({html: '<div >User added successfully!</div>'});
            setFullname("");
            setEmail("");
            setPassword("");
            setRePassword("");
        }else{
           
            M.toast({html: '<div >Password is no equal,please enter again!</div>'});
            setRePassword("");
            setPassword("");
        }
    
        event.preventDefault();
    }
    async function addUser(data){
        let jwt = localStorage.getItem('jwtToken');
        //console.log(jwt);
        const response = await fetch("http://localhost:8090/addUser", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
       //     "Authorization":"Bearer " +  jwt,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
       // let messData = await response.json();
       // console.log(messData);
    
    
        }
    return  <div className="row" style = {{marginTop:'60px'}}>
    <form className="col s6" style = {{marginLeft:'560px'}} onSubmit = {handleSubmit}>
        <div className="row">
         <blockquote style = {{borderLeft:'5px solid #b71a25'}}><h4 style = {{marginRight:'400px',color:'#163457'}}>Create new Account</h4></blockquote>
        </div>
        
        
        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'#b71a25'}}>account_circle</i>
                            <input id="icon_prefix_name" type="text" class="validate" value = {fullName} onChange = {handleFullNameChange}/>
                            <label htmlFor="icon_prefix_name">Full Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'#b71a25'}}>email</i>
                            <input id="icon_prefix_email" type="text" className="validate" value = {email} onChange = {handleEmailChange}/>
                            <label htmlFor="icon_prefix_email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'#b71a25'}}>lock</i>
                            <input id="icon_prefix_password" type="password" className="validate" value = {password} onChange = {handlePasswordChange}/>
                            <label htmlFor="icon_prefix_password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix" style = {{color:'#b71a25'}}>lock</i>
                            <input id="icon_prefix" type="password" className="validate" value = {rePassword} onChange = {handleRePasswordChange}/>
                            <label htmlFor="icon_prefix">Repeat password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <select class="browser-default" value ={role} onChange = {HandleRoleChange}>
                                    <option value="" disabled selected>Choose your option</option>
                                    <option value="2">Waiter</option>
                                    <option value="3">Chef</option>
                                   
                                </select>
                             </div>
                        </div>
                        <div className="row">
                            <div action="#" style = {{marginRight:'340px'}}>
                                <p>
                                <label>
                                    <input type="checkbox" />
                                    <span>I have read and accepted the terms and conditions</span>
                                </label>
                                </p>
                            </div>
                        </div>
            <div className="row">
            <button className="btn waves-effect waves-light" style = {{marginLeft:'360px',backgroundColor:'#b71a25'}} type="submit" >LOGIN<i class="material-icons right">send</i></button>
            </div>
            
       </form>
</div>
}
export default Registration;