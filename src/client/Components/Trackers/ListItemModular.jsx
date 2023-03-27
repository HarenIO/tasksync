import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './styles/listitemmodular.module.css';

const ListItemModular = ({ config, setUpdatedList }) => {
  const { id, title, content } = config;

  const [inputText, setInputText] = useState({ title: title || "", content: content || "" });
  const [displayedText, setDisplayedText] = useState({ title: title || "", content: content || "" });

  useEffect(() => {
    setDisplayedText({ title, content: content || "" });
  }, [title, content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisplayedText({ ...displayedText, [name]: value });
  };

  const handleSave = async () => {
    setInputText(displayedText);
    try {
      const response = await fetch('http://localhost:5050/api/items', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          id: id,
          title: displayedText.title,
          content: displayedText.content || "",
        })
      });
      const data = await response.json();
      setUpdatedList(true)
      console.log('Item updated:', data);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCancel = () => {
    setDisplayedText(inputText);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSave()
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5050/api/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await response.json();
      if(data.error) throw new Error(data.error)
      setUpdatedList(true)
      console.log('Item deleted:', data);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Dialog.Root onOpenAutoFocus={handleSave} onCloseAutoFocus={handleSave}>
      <Dialog.Trigger asChild>
        <button className={styles.cardTitle}>{title}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="name">
                Title
              </label>
              <div className={styles.InputWrapper}>
                <input
                  type="text"
                  name="title"
                  className={styles.Input}
                  value={displayedText.title}
                  onChange={handleChange}
                />
              </div>
            </fieldset>
            <fieldset className={styles.Fieldset}>
              <label className={styles.Label} htmlFor="username">
                Description
              </label>
              <div className={styles.InputWrapper}>
                <textarea
                  className={styles.textArea}
                  name="content"
                  id="username"
                  value={displayedText.content}
                  onChange={handleChange}
                />
              </div>
            </fieldset>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <button type="button" className={styles.Button} onClick={handleSave}>
                  Save changes
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  style={{ marginLeft: '10px' }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
              <button type="button" className={styles.deleteButton} onClick={handleDelete}>
                Delete item
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
  )
}

export default ListItemModular;
