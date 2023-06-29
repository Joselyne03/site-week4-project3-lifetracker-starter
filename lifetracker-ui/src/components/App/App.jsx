import './App.css'
import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import LandingPage from '../LandingPage/LandingPage';
import Register from '../Register/RegisterPage';
import LoginPage from '../Login/LoginPage';
import ActivityPage from '../ActivityPage/ActivityPage';
import NutritionPage from '../NutritionPage/NutritionPage';

//not sure if we need a home component
function App() {

  return (
    <div className='app'>
      <BrowserRouter> 
        <main> 
        <Navbar />
        <Routes> 
          <Route path = '/' element = {<LandingPage />} /> 
          <Route path = '/register' element = {<Register />} /> 
          <Route path = '/login' element = {<LoginPage />} /> 
          <Route path = '/activity' element = {<ActivityPage />} /> 
          <Route path = '/nutrition/*' element = {<NutritionPage />} />  
        

        </Routes>
       
        </main>
        
      </BrowserRouter>
    </div>
  )
}

export default App
{/*
          <Route path = '/*' element = {<NotFound />} />
*/}
          