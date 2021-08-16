import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';

import UserContext from './UserContext';
import UserProvider from './UserProvider';
import React, { useState,useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  let jwt = localStorage.getItem('jwtToken');
  const {user,login,logout,profile} = useContext(UserContext);

  return (
    <div className="App" style = {{backgroundImage:'url(https://три-вкуса.рф/wp-content/uploads/2017/06/%D1%84%D0%BE%D0%BD-%D1%80%D0%BE%D0%BB%D0%BB%D1%8B-1.jpg)'}}>
      <UserProvider >
        <Router>
        <Navbar currentUser = {user}/> 
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
