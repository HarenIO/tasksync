import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import List from '../Components/Trackers/List'

function Tracker() {

  const params = useParams()
  const [lists, setLists] = useState([])
  const [tracker, setTracker] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const fetchLists = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/trackers/${params.id}/lists`, {
        credentials: 'include'
      })
      const data = await res.json()
      if (data.error) {
        setErrorMessage(data.error)
        return
      }
      setLists(data)
      
    } catch (error) {
      console.error(error)
    }
  }

  const getTracker = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/trackers/${params.id}`, {
        credentials: 'include'
      })
      if(res.ok){
        const data = await res.json()
        setTracker(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchLists()
    getTracker()
  }, [])

  const renderedLists = lists.map((list) => {
    return <List key={list.id} name={list.name} />
  })

  return (
    <div>
      <h1>{tracker.name}</h1>
      <div className="lists" style={{ display: "flex", gap: "1rem" }}>
        {lists.length > 0 ? renderedLists : <p>{errorMessage}</p>}
        {renderedLists}
      </div>
    </div>

  )
}

export default Tracker