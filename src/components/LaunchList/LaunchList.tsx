import React from 'react'
import Launch from '../Launch/Launch'

type Props = {
    launches: {}[];
    handleShowDetails: (id:string) => void
    style: {}
}

const LaunchList:React.FC<Props> = ({launches, handleShowDetails, style}) => {
    return (
        <ul style={style}>
            {launches.map((launch: any) => <li key={launch.id}><Launch handleShowDetails={handleShowDetails} launch={launch}/></li>)}
        </ul>
    )
}

export default LaunchList
