import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import styles from './styles/AddItemAccordion.module.css'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';


const AddItemAccordion = ({ listId, setUpdatedList }) => {
  const [openItem, setOpenItem] = useState(null);
  const [title, setTitle] = useState('')

  const handleClose = (e) => {
    e.preventDefault();
    setOpenItem(null);
    setTitle('')
  };

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title) return
    try {
      const newItem = {
        title,
        list_id: listId
      }
      const res = await fetch('https://tasksync-backend.onrender.com/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newItem)
      })
      if (!res.ok) {
        throw new Error('Something went wrong')
      }
      setUpdatedList(true)
      setOpenItem(null)
      setTitle('')
    } catch (error) {
      console.error(error)
    }

  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpenItem(null);
      setTitle('')
    }
  };

  return (
    <div tabIndex="0" onBlur={handleBlur}>
      <Accordion.Root
        className={styles.AccordionRoot}
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
      >
        <Accordion.Item className={styles.AccordionItem} value="item-1">
          <AccordionTrigger>Add Item</AccordionTrigger>
          <AccordionContent >
            <form className={styles.addItemForm} onSubmit={handleSubmit} >
              <input
                type="text"
                placeholder="Item name.."
                className={styles.addItemInput}
                autoFocus
                onChange={handleChange}
              />
              <div className={styles.accordionButtons}>
                <button className={styles.addItemBtn}>Add item</button>
                <AiOutlineClose
                  className={styles.closeAccordion}
                  onClick={handleClose}
                />
              </div>
            </form>
          </AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className={styles.AccordionHeader}>
    <Accordion.Trigger
      className={`${styles.AccordionTrigger} ${className}`}
      {...props}
      ref={forwardedRef}
    >
      <AiOutlinePlus />
      {children}

    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={`${styles.AccordionContent} ${className}`}
    {...props}
    ref={forwardedRef}
  >
    <div className={styles.AccordionContentText}>{children}</div>
  </Accordion.Content>
));


export default AddItemAccordion;
