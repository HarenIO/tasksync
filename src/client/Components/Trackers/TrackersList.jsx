import React, { useEffect, useState } from 'react'
import TrackerCard from './TrackerCard'
import { useAuth } from '../../Context/AuthContext'
import styles from './styles/trackerlist.module.css'

function TrackersList({ trackersUpdated, setTrackersUpdated }) {

  const { user } = useAuth();

  const [trackers, setTrackers] = useState([])

  const fetchTrackers = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/users/${user.id}/trackers`,
        {
          credentials: 'include'
        })
      if(res.status === 204){
        setTrackers([])
        return
      }
      const data = await res.json()
      if (data.error) {
        return
      }
      setTrackers(data)
      if (trackersUpdated) {
        setTrackersUpdated(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTrackers()
  }, [trackersUpdated])

  const renderedTrackers = trackers.map((tracker) => {
    return <TrackerCard key={tracker.id} tracker={tracker} />
  })

  return (
    <div className={styles.trackersList}>
      {trackers.length > 0 ? (
        renderedTrackers
      ) : (
        <p className={styles.noTrackers}>You don't have any trackers yet</p>
      )}
    </div>
  );
}

export default TrackersList;