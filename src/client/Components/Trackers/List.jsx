import React, { useEffect, useState } from 'react';
import styles from './styles/list.module.css';
import AddItemAccordion from './AddItemAccordion'
import ListItem from './ListItem'
import DeleteListButton from './DeleteListButton'

function List({ name, id, setEditedList }) {

  const [listItems, setListItems] = useState([])
  const [updatedList, setUpdatedList] = useState(false)
  const listInfo = {name, id}

  const fetchItems = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/lists/${id}/items`, {
        method: 'GET',
        credentials: 'include'
      })
      if (!res.ok) {
        return console.log('Something went wrong')
      }
      const data = await res.json()
      setListItems(data)
      if (updatedList) {
        setUpdatedList(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [updatedList])

  const renderedListItems = listItems.map((item) => {
    return <ListItem setUpdatedList={setUpdatedList} key={item.id} config={item} />
  })

  return (

    <div className={styles.listCard}>
      <div className={styles.listHeader}>
        <h1 className={styles.listCardTitle}>{name}</h1>
        <DeleteListButton setEditedList={setEditedList} listInfo={listInfo} className={styles.settingsIcon}/>
      </div>
      <div className={styles.divider}></div>
      {renderedListItems}
      <AddItemAccordion listId={id} setUpdatedList={setUpdatedList} />
    </div>
  );
}

export default List;
