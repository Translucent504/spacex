import { gql } from '@apollo/client';


const LAST_LAUNCHES = gql`
query lastLaunches($offset: Int){
  launchesPast(limit: 20, offset: $offset) {
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