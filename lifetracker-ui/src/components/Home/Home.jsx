import './Home.css';

export default function Home () {
    return (
        <div className='home'>
            <div className='tiles'>
                <div className='card'> 
                    <h3 className='fitness-title'>Fitness</h3>
                    <img className='fitness-image' src = 'https://hips.hearstapps.com/hmg-prod/images/woman-running-against-wall-royalty-free-image-930134532-1552999674.jpg' />
                </div>
                <div className='card'> 
                    <h3 className='food-title'>Food</h3>
                    <img className='fitness-image' src = 'https://hips.hearstapps.com/hmg-prod/images/woman-running-against-wall-royalty-free-image-930134532-1552999674.jpg' />
                </div>
                <div className='card'> 
                    <h3 className='rest-title'>Rest</h3>
                    <img className='fitness-image' src = 'https://hips.hearstapps.com/hmg-prod/images/woman-running-against-wall-royalty-free-image-930134532-1552999674.jpg' />
                </div>
                <div className='card'> 
                    <h3 className='planner-title'>Planner</h3>
                    <img className='fitness-image' src = 'https://hips.hearstapps.com/hmg-prod/images/woman-running-against-wall-royalty-free-image-930134532-1552999674.jpg' />
                </div>
            </div>
        </div>
    )

}