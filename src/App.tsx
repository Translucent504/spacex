import React, { useState } from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import LaunchList from './components/LaunchList/LaunchList';
import LaunchDetails from './components/LaunchDetails/LaunchDetails';

const LAST_LAUNCHES = gql`
query {
  launchesPast(limit: 10) {
    mission_name
    launch_date_local
    links {
      flickr_images
    }
    id
    launch_success
  }
}
`

function App() {
  const [launch, setLaunch] = useState<string | null>(null)
  const result = useQuery(LAST_LAUNCHES)

  if (result.loading) {
    return <div>Loading ...</div>
  }
  const handleShowDetails = (id: string | null) => {
    setLaunch(id)
  }

  const hideWhenLaunch = {display: launch? 'none': ''}

  return (
    <div className="App">
      <h1>ERU SpaceX</h1>
      {launch && <LaunchDetails handleShowDetails={handleShowDetails} id={launch} />}
      <LaunchList style={hideWhenLaunch} handleShowDetails={handleShowDetails} launches={result.data.launchesPast} />
    </div>
  );
}

export default App;
