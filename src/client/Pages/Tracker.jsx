import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import List from '../Components/Trackers/List'
import CreateList from '../Components/Trackers/CreateList'
import styles from './tracker.module.css'

function Tracker() {

  const params = useParams()
  const [listsUpdated, setListsUpdated] = useState(false)
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
      if(listsUpdated){
        setListsUpdated(false)
      }
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
  }, [listsUpdated])

  const renderedLists = lists.map((list) => {
    return <List key={list.id} name={list.name} />
  })

  return (
    <div>
      <h1>{tracker.name}</h1>
      <div className={styles.list}>
        {renderedLists}
        <CreateList trackerId={tracker.id} setListsUpdated={setListsUpdated} listsUpdated={listsUpdated}/>
      </div>
    </div>

  )
}

export default Tracker