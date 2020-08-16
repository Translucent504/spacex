import React from 'react'
import './Launch.css'

type Props = {
    launch: {
        mission_name: string;
        launch_date_local: string;
        links: {
            flickr_images: string[];
        }
        id: string;
        launch_success: boolean;
    }
    handleShowDetails: (id:string) => void
}

const Launch: React.FC<Props> = ({ launch, handleShowDetails }) => {
    return (
        <div className='card-container'>
            <img className='launch-img' src={launch.links.flickr_images[0]} alt="" />
            <div className='mission-info'>
                <span className='mission-name'>{launch.mission_name}</span>
                <span className='launch-date'>{launch.launch_date_local}</span>
                <button onClick={() => handleShowDetails(launch.id)}>Show Details</button>
            </div>
            <h2 className='launch-success'>{launch.launch_success? 'Success' : 'Fail'}</h2>
        </div>
    )
}

export default Launch
