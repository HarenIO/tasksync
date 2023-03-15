import React, { useEffect, useState } from 'react'
import TrackerCard from './TrackerCard'
import { useAuth } from '../../Context/AuthContext'

function TrackersList() {

  const { user } = useAuth();

  const [trackers, setTrackers] = useState([])

  const fetchTrackers = async () => {
    const res = await fetch(`http://localhost:5050/api/users/${user.id}/trackers`,
      {
        credentials: 'include'
      })
    const data = await res.json()
    setTrackers(data)
  }

  useEffect(() => {
    fetchTrackers()
  }, [])

  const renderedTrackers = trackers.map((tracker) => {
    return <TrackerCard key={tracker.id} tracker={tracker} />
  })

  return (
    <>
      {renderedTrackers}
    </>
  )
}

export default TrackersList