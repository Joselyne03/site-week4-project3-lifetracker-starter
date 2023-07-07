import "./LoginPage.css"
import { useState } from "react"

export default function LoginPage({loginUser,loginState}){
    const [login, setLogin] = useState({email : "", password : ""});
    //const [password, setPassword] = useState({password : ""});
    const handleLoginInput = (name,event) => {
        setLogin((prevState) => ({...prevState, [name] : event}))
        console.log({login})

    }
    const handelSubmitLogin = (event) => {
        event.preventDefault();
        console.log("Form is subitted!");
        loginUser(login.email, login.password);
        //should have a fucntion that takes in the info and passes to the db
    }
    return (
        <div className="loginPage">
        {loginState ? (
        <>
        <h1>Welcome! You are logged in!</h1>
        </>
        ): (
        <div>
            <h1 className="login-Header">Login</h1>
            <form className="loginForm" onSubmit={handelSubmitLogin} >
            <h1 className="inputHeader">Email:</h1>
            <input 
            type="email" 
            className="form-input" 
            name="email"
            value = {login.email} 
            onChange={(event) => {handleLoginInput(event.currentTarget.name, event.currentTarget.value)}}
            placeholder="email@example.com"/>
            <h1 className="inputHeader">Password:</h1>
            <input 
            type="password" 
            className="form-input" 
            name="password"
            value = {login.password} 
            onChange={(event) => {handleLoginInput(event.currentTarget.name, event.currentTarget.value)}}
            placeholder="password"/>
            <button className="buttonSubmission">login</button>
            </form>
        </div>
             
        )}
       
    </div>
    )
   
}