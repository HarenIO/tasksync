import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import List from '../Components/Trackers/List'
import CreateList from '../Components/Trackers/CreateList'
import styles from './styles/tracker.module.css'
import MembersList from '../Components/Trackers/MembersList'
import EditTracker from '../Components/Trackers/EditTracker'

function Tracker() {

  const params = useParams()
  const [listsUpdated, setListsUpdated] = useState(false)
  const [trackerMembers, setTrackerMembers] = useState([])
  const [lists, setLists] = useState([])
  const [tracker, setTracker] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const fetchLists = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/trackers/${params.id}/lists`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.error) {
        setErrorMessage(data.error);
        return;
      }
      setLists(data);
      if (listsUpdated) {
        setListsUpdated(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTracker = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/trackers/${params.id}`, {
        credentials: 'include'
      })
      if (res.ok) {
        const data = await res.json()
        setTracker(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getMembers = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/trackers/${params.id}/users`, {
        method: 'GET',
        credentials: 'include'
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error)
      }
      setTrackerMembers(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchLists()
    getTracker()
    getMembers()
  }, [listsUpdated])

  const renderedLists = lists.map((list) => {
    return <List key={list.id} name={list.name} id={list.id} />
  })
  return (
    <div className={styles.listsContainer}>
      <div className={styles.trackerHeader}>
        <h1 className={styles.trackerTitle}>{tracker.name}</h1>
        <EditTracker setListsUpdated={setListsUpdated} tracker={tracker}/>
        <MembersList members={trackerMembers} listsUpdated={listsUpdated} setListsUpdated={setListsUpdated}/>
      </div>
      <div className={styles.list}>
        {renderedLists}
        <CreateList trackerId={tracker.id} setListsUpdated={setListsUpdated} listsUpdated={listsUpdated} />
      </div>
    </div>
  )

}

export default Tracker