import React from 'react'
import { gql, useQuery } from '@apollo/client'
import './LaunchDetails.css'

const LAUNCH_QUERY = gql`
query LaunchQuery( $id: ID! ) {
    launch( id: $id ) {
        mission_name
        launch_year
        launch_success
        launch_date_local,
        rocket {
            rocket_name
            rocket_type
        }
        links {
            flickr_images
        }
    }
} 
`;

type Props = {
    id: string | null;
    handleShowDetails: (id: string | null) => void;
}

const LaunchDetails: React.FC<Props> = ({ id, handleShowDetails }) => {
    const result = useQuery(LAUNCH_QUERY, { variables: { id } })
    if (result.loading) {
        return <div>Loading...</div>
    }
    return (
        <div className='launch-details-container'>
            <h1>{result.data.launch.mission_name}</h1>
            <button onClick={() => handleShowDetails(null)}>Back</button>
            <div>
                {result.data.launch.launch_year}
                {result.data.launch.launch_success}
                {result.data.launch.launch_date_local}
            </div>
            <h2>
                {result.data.launch.rocket.rocket_name}
            </h2>
            <h3>
                {result.data.launch.rocket.rocket_type}
            </h3>
            <div className='img-container'>
                {result.data.launch.links.flickr_images.map((l:string) => <img src={l} alt='lol'></img>)}
            </div>
        </div>
    )
}

export default LaunchDetails
