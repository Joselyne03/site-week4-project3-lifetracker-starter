import "./RegisterPage.css"
import { useState } from "react";

export default function RegisterPage({registerUser}){
    const INITAL_REGISTER_STATE = {
         email : "", 
         username: "",
         firstName: "",
         lastName : "",
         password : "",
         passwordConfirm : "",
    }
    const [registration, setRegistration] = useState(INITAL_REGISTER_STATE);
    const handleRegisterInput = (name,event) => {
        setRegistration((prevState) => ({...prevState, [name] : event}))
        console.log({registration})

    }
    const handelSubmitRegistration = (event) => {
        event.preventDefault();
        console.log("Form is subitted!");
        registerUser(registration.email, 
                    registration.username,
                    registration.firstName,
                    registration.lastName,
                    registration.password,
                    registration.passwordConfirm)
        setRegistration(INITAL_REGISTER_STATE);
        //should have a fucntion that takes in the info and passes to the db
    }
    return (
        <div className="registrationPage">
        <h1 className="registration-Header">Register Here!</h1>
        <form className="registerForm" onSubmit={handelSubmitRegistration} >
            <h1 className="inputHeader">Email:</h1>
            <input 
            type="email" 
            className="form-input" 
            name="email"
            value = {registration.email} 
            onChange={(event) => {handleRegisterInput(event.currentTarget.name, event.currentTarget.value)}}
            placeholder="email@example.com"/>
            <h1 className="inputHeader">First Name:</h1>
            <input 
            type="text" 
            className="form-input" 
            name="firstName"
            value = {registration.firstName} 
            onChange={(event) => {handleRegisterInput(event.currentTarget.name, event.currentTarget.value)}}
            placeholder="First Name"/>
            <h1 className="inputHeader">Last Name:</h1>
            <input 
            type="text" 
            className="form-input" 
            name="lastName"
            value = {registration.lastName} 
            onChange={(event) => {handleRegisterInput(event.currentTarget.name, event.currentTarget.value)}}
            placeholder="Last Name"/>
            <h1 className="inputHeader">Username:</h1>
            <input 
            type="text" 
            className="form-input" 
            name="username"
            value = {registration.username} 
            onChange={(event) => {handleRegisterInput(event.currentTarget.name, event.currentTarget.value)}}
            placeholder="Username"/>
            <h1 className="inputHeader">Password:</h1>
            <input 
            type="password" 
            className="form-input" 
            name="password"
            value = {registration.password} 
            onChange={(event) => {handleRegisterInput(event.currentTarget.name, event.currentTarget.value)}}
            placeholder="Password"/>
            <h1 className="inputHeader">Confirm Password:</h1>
            <input 
            type="password" 
            className="form-input" 
            name="passwordConfirm"
            value = {registration.passwordConfirm} 
            onChange={(event) => {handleRegisterInput(event.currentTarget.name, event.currentTarget.value)}}
            placeholder="Confirm Password"/>
            <button className="buttonSubmission">login</button>
        </form>
    </div>
    )
   
}