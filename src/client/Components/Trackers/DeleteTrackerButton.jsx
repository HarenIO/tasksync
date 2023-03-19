import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from './styles/deletetrackerbutton.module.css';
import { useParams, useNavigate } from 'react-router-dom';


const DeleteTrackerButton = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/trackers/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await res.json()
      if(data.error) throw new Error(data.error)
      navigate('/profile')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className={styles.deleteButton}>Delete Tracker</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
        <AlertDialog.Content className={styles.AlertDialogContent}>
          <AlertDialog.Title className={styles.AlertDialogTitle}>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description className={styles.AlertDialogDescription}>
            This action cannot be undone. This will permanently delete your the tracker and all its lists.
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button className={styles.cancelButton}>Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className={styles.deleteButton} onClick={handleClick}>Yes, delete tracker</button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
};

export default DeleteTrackerButton;