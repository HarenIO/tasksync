import React, {useState} from 'react'
import styles from './styles/listitem.module.css'
import { CiEdit } from 'react-icons/ci'
import ListItemModular from './ListItemModular'

function ListItem({ config, setUpdatedList }) {
  const { id, title, content } = config

  return (
    <div className={styles.itemCard}>
      <ListItemModular setUpdatedList={setUpdatedList} config={config}/>
      </div>
  )
}

export default ListItem