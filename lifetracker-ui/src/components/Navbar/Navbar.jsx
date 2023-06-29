import './Navbar.css';
import * as React from 'react';
import {Link} from "react-router-dom";
import NavLinks from '../NavLinks/NavLinks';

export default function Navbar () {
    return (
        <div className='navbar'>
            <div className='logo'>
            <Link to="/"><img name="logo-image" src='https://static.vecteezy.com/system/resources/previews/007/007/216/original/fitness-logo-and-gym-icon-design-illustrationicon-free-vector.jpg' alt= "LEGO Logo" width="60" height="60" /></Link> 
            </div>
            <NavLinks/>
        </div>
    )

}