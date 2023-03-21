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
  const [editedList, setEditedList] = useState(false)
  const [trackerMembers, setTrackerMembers] = useState([])
  const [lists, setLists] = useState([])
  const [tracker, setTracker] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const fetchLists = async () => {
    try {
      const res = await fetch(`https://tasksync-api.haren.io/api/trackers/${params.id}/lists`, {
        credentials: 'include'
      });
      if(res.status === 204){
        setLists([])
        setListsUpdated(false);
        setEditedList(false)
        return
      }
      if(res.status === 403){
        navigate('/')
      }
      const data = await res.json();
      if (data.error) {
        setErrorMessage(data.error);
        return;
      }
      setLists(data);
      if (listsUpdated || editedList) {
        setListsUpdated(false);
        setEditedList(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTracker = async () => {
    try {
      const res = await fetch(`https://tasksync-api.haren.io/api/trackers/${params.id}`, {
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
      const res = await fetch(`https://tasksync-api.haren.io/api/trackers/${params.id}/users`, {
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
    getTracker()
    getMembers()
  }, [listsUpdated])

  useEffect(() => {
    fetchLists()
  }, [editedList, listsUpdated])

  const renderedLists = lists.map((list) => {
    return <List setEditedList={setEditedList} key={list.id} name={list.name} id={list.id} />
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