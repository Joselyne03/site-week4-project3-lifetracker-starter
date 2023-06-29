import './LandingPage.css'
import * as React from 'react'
import Home from "../Home/Home"

//the page that is acesses by everyone like a home page?
export default function LandingPage () {
    return (
        <div className='landing-page'>
            <div className='hero'> 
                <div className='pageDetail'>
                    <h1 className='title'>LifeTracker</h1>
                    <p className='cta' >Helping you take control of your world</p>

                </div>
                <img className='hero-img' src = 'https://assets.entrepreneur.com/content/3x2/2000/1617704161-pexels-pixabay-267394.jpg' />
            </div>
            <Home/>
            
        </div>
    )

}