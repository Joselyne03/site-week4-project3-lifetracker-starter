import "./LoginPage.css"
import { useState } from "react"

 function LoginPage({loginUser,loginState, errorCheck}){
    const [login, setLogin] = useState({email : "", password : ""});
    const handleLoginInput = (name,event) => {
        setLogin((prevState) => ({...prevState, [name] : event}))
        console.log({login})

    }
    const handelSubmitLogin = (event) => {
        event.preventDefault();
        console.log("Form is subitted!");
        loginUser(login.email, login.password);
    }
   
    return (
        <div className="loginPage">
        {loginState ? (
        <>
        <h1>Welcome!</h1>
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
            {errorCheck?<div>{errorCheck.message}</div>:null}          
            {/* <div className="error statement"> Invaild username/password</div> */}
            <br/>
            <button className="buttonSubmission" to= "/">login</button>
            </form>
        </div>
             
        )}
       
    </div>
    )
   
}
export default LoginPage;