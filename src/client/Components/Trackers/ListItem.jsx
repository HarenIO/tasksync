import React from 'react'
import styles from './styles/listitem.module.css'
import { CiEdit } from 'react-icons/ci'

function ListItem({ config }) {
  const { id, title, content } = config
  return (
    <div className={styles.itemCard}>
      <div className={styles.itemCardHeader}>
        <p className={styles.title}>{title}</p>
        <CiEdit className={styles.editIcon} />
      </div>
    </div>
  )
}

export default ListItem