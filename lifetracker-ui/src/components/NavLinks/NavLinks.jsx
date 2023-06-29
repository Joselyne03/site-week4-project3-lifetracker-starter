import './NavLinks.css';
import * as React from 'react';
import {Link} from "react-router-dom";

export default function NavLinks () {
    return (
        <div className='nav-links'>
            <Link to = '/activity' className='icons'>Activity</Link>
            <Link to = '/' className='icons'>Exercise</Link>
            <Link to = '/nutrition' className='icons'>Nutrition</Link>
            <Link to = '/' className='icons'>Sleep</Link>
            {/* if a user to logged in it should render a log out button */}
            {/* In the meantime it should render a register or sign up button */}
            <Link to='/login' className='login icons'>Login</Link>
            <Link to='/register' className='register icons'>Register</Link>
        </div>

    )

}