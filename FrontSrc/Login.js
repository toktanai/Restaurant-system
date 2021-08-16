import logo from './logo.svg';
import './App.css';
import UserContext from './UserContext';
import React, { useState,useContext } from 'react';


function Login(){
    const {user,login,logout,profile} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message,setMessage] = useState("");

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleSubmit = event =>{
        const inputData = {email, password};
        console.log(inputData);
        auth(inputData);
    
        event.preventDefault();
    }
    async function test(){
        let jwt = localStorage.getItem('jwtToken');
        console.log(jwt);
        alert(jwt);
    }
    async function auth(data){
        
        const response = await fetch("http://localhost:8090/auth", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
          });

        if(response.status==200){
            let jwt = await response.json();
            console.log(jwt);
            localStorage.setItem('jwtToken', jwt.jwtToken);
            profile();
            //user.auth(true);
            console.log(user);
            
        }else{
            setMessage("Wrong password or email,please again enter!");
            setEmail("");
            setPassword("");
        }

    }
    return  <div className="row" style = {{marginTop:'60px'}}>
    <form className="col s6" style = {{marginLeft:'560px'}} onSubmit = {handleSubmit}>
        <div className="row">
         <blockquote style = {{borderLeft:'5px solid #b71a25'}}><h4 style = {{marginRight:'740px',color:'#163457'}}>Sign In</h4></blockquote>
        </div>
        <div className = "row">
            <div className = "alert alert-danger" role="alert" hidden = {message == ""}>
                {message}
            </div>
        </div>
        
            <div className="row">
                <div className="input-field col s6">
                <i className="material-icons prefix" style = {{color:'#b71a25'}}>email</i>
                <input id="icon_prefix_emal" type="text" className="validate" value = {email} onChange = {handleEmailChange}/>
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
            <div className="row">
                <form action="#" style = {{marginRight:'600px'}}>
                    <p>
                    <label>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>
                    </p>
                </form>
            </div>
            <div className="row">
            <button className="btn waves-effect waves-light" style = {{marginLeft:'360px',backgroundColor:'#b71a25'}} type="submit" >LOGIN<i class="material-icons right">send</i></button>
            </div>
           
            
       </form>
</div>
}

export default Login;