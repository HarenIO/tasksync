import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon } from '@radix-ui/react-icons';
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import styles from './styles/deletelistbutton.module.css';

const DeleteListButton = ({ setEditedList, listInfo }) => {

  const [listName, setListName] = useState(listInfo.name)


  const handleApplyClick = async () => {
    try {
      const res = await fetch('https://tasksync.onrender.com/api/lists', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          new_name: listName,
          list_id: listInfo.id
        })
      })
      const data = await res.json()
      if(data.error){
        throw new Error(data.error)
      }
      setEditedList(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setListName(e.target.value)
  }

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`https://tasksync.onrender.com/api/lists/${listInfo.id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await res.json()
      if(data.error){
        throw new Error(data.error)
      }
      setEditedList(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.IconButton} aria-label="Edit List">
          <BiDotsHorizontalRounded />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.PopoverContent} sideOffset={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p className={styles.Text} style={{ marginBottom: 10 }}>
              Edit List
            </p>
            <fieldset className={styles.Fieldset}>
              <input className={styles.Input} id="width" placeholder={listInfo.name} onChange={handleChange} />
              <button className={styles.applyButton} onClick={handleApplyClick}>Apply changes</button>
            </fieldset>

            <button className={styles.deleteButton} onClick={handleDeleteClick}>Delete list</button>
          </div>
          <Popover.Close className={styles.PopoverClose} aria-label="Close">
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className={styles.PopoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DeleteListButton;
