import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './styles/createlist.module.css';

const CreateList = ({trackerId, setListsUpdated}) => {
  const [newList, setNewList] = useState({ name: "My list" });
  const [open, setOpen] = useState(false);

  const createNewList = async () => {
    try {
      const res = await fetch('http://localhost:5050/api/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({...newList, tracker_id: trackerId})
      })
      const data = await res.json()
      if(data.error){
        throw new Error(data.error)
      }
      setListsUpdated(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewList()
    setOpen(false)
  };

  const handleChange = (e) => {
    setNewList({ name: e.target.value });
  };
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className={styles.IconButton} aria-label="Add a list">
          Add a list
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.PopoverContent} sideOffset={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p className={styles.Text} style={{ marginBottom: 10 }}>
              Create a list
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset className={styles.Fieldset}>
                <input className={styles.Input} id="width" defaultValue="My list" maxLength="50" onChange={handleChange} />
              </fieldset>
            </form>
            <button className={styles.CreateBtn} onClick={handleSubmit}>Create List</button>
          </div>
          <Popover.Close className={styles.PopoverClose} aria-label="Close">
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className={styles.PopoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default CreateList;
