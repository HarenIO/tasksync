import React, {useState} from 'react'
import TrackersList from '../Components/Trackers/TrackersList'
import CreateTracker from '../Components/Trackers/CreateTracker'
import '../Components/Trackers/createtracker.module.css'

function Profile() {
  const [trackersUpdated, setTrackersUpdated] = useState(false)
  return (
    <div>
      <div style={{display:"flex", gap:"1rem", alignItems:"center"}}>
        <h1>My Trackers</h1>
        <CreateTracker setTrackersUpdated={setTrackersUpdated}/>
      </div>
      <TrackersList trackersUpdated={trackersUpdated} setTrackersUpdated={setTrackersUpdated}/>
    </div>
  )
}

export default Profile