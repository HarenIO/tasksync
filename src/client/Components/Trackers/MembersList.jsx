import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useParams } from 'react-router-dom';
import RemoveMemberBtn from './RemoveMemberBtn'
import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { AiOutlineUser } from 'react-icons/ai'
import { useAuth } from '../../Context/AuthContext';
import styles from './styles/memberslist.module.css';

const MembersList = ({ members, setListsUpdated }) => {

  const { user } = useAuth()
  const { id } = useParams()

  const [userToAdd, setUserToAdd] = useState('')
  const [feedbackText, setFeedbackText] = useState('')

  const addNewMember = async () => {
    try {
      const payload = {
        tracker_id: id,
        username: userToAdd
      }
      const res = await fetch('http://localhost:5050/api/trackers/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if(data.error){
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
    setUserToAdd(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewMember()
  }

  const renderedMembers = members.map((member) => {
    return (
      <div key={member.user_id} className={styles.membersItem}>
        {member.username === user.username ? ` ${member.username} (you)` : member.username}
        <RemoveMemberBtn setFeedbackText={setFeedbackText} userId={member.user_id} setListsUpdated={setListsUpdated} />
      </div>
    )
  })


  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={styles.Button + ' ' + styles.violet}><AiOutlineUser />Members</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>Tracker Members</Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>
            Only the tracker owner is able to invite and remove members.
          </Dialog.Description>
          <div className={styles.membersList}>
            {renderedMembers}
          </div>
          <p className={styles.feedbackText}>{feedbackText}</p>
          <form className={styles.addMemberArea} onSubmit={handleSubmit}>
            <input className={styles.Input} id="username" placeholder="Username.." onChange={handleChange} />
            <button className={styles.Button + ' ' + styles.green}>Add member</button>
          </form>
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
export default MembersList;