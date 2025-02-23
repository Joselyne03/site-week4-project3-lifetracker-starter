import './App.css'
import * as React from 'react'
import jwtDecode from "jwt-decode"
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
//import Home from "../Home/Home"
import LandingPage from '../LandingPage/LandingPage';
import Register from '../Register/RegisterPage';
import LoginPage from '../Login/LoginPage';
import ActivityPage from '../ActivityPage/ActivityPage';
import NutritionPage from '../NutritionPage/NutritionPage';
import NotFound from '../NotFound/NotFound'

import axios from 'axios'

//not sure if we need a home component
function App() {
  const [appState, setAppState] = useState({
    user: "",
    isAuthenticated: false,
    sleep: "",
    exercise: "",
  })
  const [error, setError] = useState(null);
  const [user, setUser] = useState({})
  const [nutritionList, setNutrtionList] = useState([]);
  
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    //chekc if the user is logged in 
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        //will decode the token
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          const response = await fetch("https://lifetracker-be.onrender.com/auth/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " + token
            },
          });
          //data is returing the users value
          //response itself is a promise function that will return its proper response
          //but it must have an await so it wont be rushed and just return a status code
          const data = await response.json();
          setUser(data.user);
          //since the user is logged in
          //the other components can now be available to the user
          setLoginState(true);
          setAppState((prev) => ({ ...prev, isAuthenticated: true }));
        } else {
          //set the user to log out
          handelLogout();
        }
      }
    }
    checkLoggedIn();

  }, [])
  //handles when the user registers and sends it to the BE
  const registerUser = async (email, username, first_name, last_name, password, password_confirmation) => {
    try {
      const response = await fetch("https://lifetracker-be.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, first_name, last_name, password, password_confirmation })
      });
      const data = await response.json();

      if (response.ok) {
        setLoginState(true);

      }
    } catch (error) {
      console.error("Error: ", error);

    }

  }
  //handles when the user logins and sends it to the BE
  const loginUser = async (email, password) => {
    try {
      const response = await fetch("https://lifetracker-be.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.status === 200) {
        const { token } = data;
        localStorage.setItem("token", token);
        setLoginState(true);
        setUser(data.user)
        console.error(null)

      } else if (response.status === 500) {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error: ", error);

    }

  }
  //handels when a nutrition is created to the backend
  // Should be state if this renders something on the frontend
  const nutritionEntry = async (name, calories, image_url, category, quantity, user_id) => {
    console.log("THIS IS THE USER ID FROM TABLE: ", user_id)
    try {
      const response = await fetch("https://lifetracker-be.onrender.com/nutrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, category, calories, image_url, quantity, user_id })
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
      }
    } catch (error) {
      console.error("Error: ", error);

    }

  }
  const listNutritionhandeler = async () => {
    const response = await fetch(`https://lifetracker-be.onrender.com/nutrition/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    //data is returing the users value
    //response itself is a promise function that will return its proper response
    //but it must have an await so it wont be rushed and just return a status code
    const data = await response.json();
    setNutrtionList(data.nutrition);
    console.log("new user state: ", nutritionList);

  }
  const handelLogout = () => {
    localStorage.removeItem("token");
    setLoginState(false);
    setAppState((prev) => ({ ...prev, isAuthenticated: false }));
  }
  return (
    <div className='app'>
      <BrowserRouter>
        <main>
          <Navbar loginState={loginState} handelLogout={handelLogout} />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/register' element={<Register registerUser={registerUser} />} />
            <Route path='/login' element={<LoginPage loginUser={loginUser} loginState={loginState} errorCheck={error} />} />
            <Route path='/activity' element={<ActivityPage appState={appState.isAuthenticated} />} />
            <Route path='/nutrition/*' element={loginState ? (<NutritionPage appState={appState.isAuthenticated} nutritionEntry={nutritionEntry} user={user} listNutritionhandeler={listNutritionhandeler} nutritionList={nutritionList} />) : (<></>)} />
            <Route path='/*' element={<NotFound />} />


          </Routes>

        </main>

      </BrowserRouter>
    </div>
  )
}

export default App

