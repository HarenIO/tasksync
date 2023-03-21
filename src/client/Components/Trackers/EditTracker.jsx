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

  const [feedbackText, setFeedbackText] = useState('')
  const [trackerName, setTrackerName] = useState('')


  const changeTrackerName = async () => {
    try {
      const payload = {
        tracker_id: id,
        new_tracker_name: trackerName
      }
      const res = await fetch('https://tasksync-backend.onrender.com/api/trackers/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.error) {
        setFeedbackText(data.error)
        return
      }
      setListsUpdated(true)
      setFeedbackText('')
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
            <p className={styles.feedbackText}>{feedbackText}</p>
          <div className={styles.buttonArea}>
            <form onSubmit={handleSubmit} className={styles.submitForm}>
              <input className={styles.Input} id="trackerName" value={trackerName} placeholder={name} onChange={handleChange} />
              <div className={styles.buttonContainer}>
                <button className={styles.applyButton}>Save changes</button>
                <DeleteTrackerButton/>
              </div>
            </form>
          </div>
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