import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useParams } from 'react-router-dom';
import { Cross2Icon } from '@radix-ui/react-icons';
import { AiOutlineUser } from 'react-icons/ai'
import styles from './styles/edittracker.module.css';
import DeleteTrackerButton from './DeleteTrackerButton'

const EditTracker = ({ setListsUpdated, tracker }) => {

  const { id } = useParams()
  const { name } = tracker

  const [trackerName, setTrackerName] = useState('')


  const changeTrackerName = async () => {
    try {
      const payload = {
        tracker_id: id,
        new_tracker_name: trackerName
      }
      const res = await fetch('http://localhost:5050/api/trackers/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.error) {
        return console.log(data.error)
      }
      setListsUpdated(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setTrackerName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    changeTrackerName()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={styles.Button + ' ' + styles.violet}><AiOutlineUser />Edit Tracker</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>Edit Tracker</Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>
            Only the tracker owner is able to delete and edit this tracker.
          </Dialog.Description>
          <div className={styles.membersList}>
          </div>
          <form className={styles.addMemberArea} onSubmit={handleSubmit}>
            <input className={styles.Input} id="trackerName" value={trackerName} placeholder={name} onChange={handleChange} />
            <button className={styles.Button + ' ' + styles.green}>Save changes</button>
          </form>
          <DeleteTrackerButton />
          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export default EditTracker;