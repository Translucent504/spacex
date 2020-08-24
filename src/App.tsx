import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import LaunchList from './components/LaunchList/LaunchList';
import LaunchDetails from './components/LaunchDetails/LaunchDetails';
import { useLastLaunchesQuery } from './generated/graphql'



function App() {
  const [launch, setLaunch] = useState<string | null>(null)
  const { data, loading, fetchMore } = useLastLaunchesQuery({ variables: { offset: 0 } })
  
  
  const loader = useRef<any>();
  useEffect(() => {
    const loadMore = (entities:any) => {
      const target = entities[0]
      if (target.isIntersecting && !launch) {   
        fetchMore({
          variables: {
            offset: data?.launchesPast?.length
          }
        })
    }
    }
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    const observer = new IntersectionObserver(loadMore, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [data, fetchMore, launch])


  if (loading) {
    return <div>Loading ...</div>
  }

  const handleShowDetails = (id: string | null) => {
    setLaunch(id)
  }

  const hideWhenLaunch = { display: launch ? 'none' : '' }



  return (
    <div className="App">
      <h1>ERU SpaceX Launch Tracker</h1>
      {launch && <LaunchDetails handleShowDetails={handleShowDetails} id={launch} />}
      <LaunchList style={hideWhenLaunch} handleShowDetails={handleShowDetails} launches={data?.launchesPast} />
      <div ref={loader}>Load More</div>
    </div>
  );
}

export default App;
