import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./styles/createtracker.module.css";

const CreateTracker = ({setTrackersUpdated}) => {
  const [newTracker, setNewTracker] = useState({ name: "My tracker" });
  const [open, setOpen] = useState(false);

  const createNewTracker = async () => {
    try {
      const res = await fetch('https://tasksync-api.haren.io/api/trackers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(newTracker)
    })
    if(res.ok){
      setTrackersUpdated(true)
    }
    } catch (error) {
      console.error(error)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    createNewTracker()
  };

  const handleChange = (e) => {
    setNewTracker({ name: e.target.value });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className={styles.EditButton}>Create Tracker</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            Create a tracker
          </Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}></Dialog.Description>
          <form onSubmit={handleSubmit}>
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="name">
                Tracker Name
              </label>
              <input
                className={styles.Input}
                id="name"
                onChange={handleChange}
                defaultValue="My tracker"
              />
            </fieldset>
            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            >
              <button className={styles.SaveButton} type="submit">
                Create
              </button>
            </div>
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
};

export default CreateTracker;
