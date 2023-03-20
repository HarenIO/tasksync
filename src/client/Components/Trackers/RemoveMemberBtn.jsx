import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './styles/removememberbtn.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'

const RemoveMemberBtn = ({ userId, setListsUpdated }) => {

  const { id } = useParams()
  const [open, setOpen] = useState(false);
  const { user } = useAuth()
  const navigate = useNavigate()

  const removeMember = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/trackers/${id}/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await res.json()
      if (data.error) {
        return console.log(data)
      }
      if (userId === user.id){
        navigate('/profile')
      }
        setListsUpdated(true)
    } catch (error) {
      console.error(error)
    } finally {
      setOpen(false)
    }

  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className={styles.IconButton} aria-label="Update dimensions">
          <AiOutlineClose />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.PopoverContent} sideOffset={5}>
          <div className={styles.popoverWindow}>
            <p className={styles.Text} style={{ marginBottom: 10 }}>
              Are you sure you want to remove this member?
            </p>
            <button className={styles.yesBtn} onClick={removeMember}>Yes</button>
            <button className={styles.noBtn} onClick={handleClose}>No</button>
          </div>
          <Popover.Arrow className={styles.PopoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default RemoveMemberBtn;
