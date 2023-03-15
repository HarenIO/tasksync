// List.jsx
import React from 'react';
import styles from './list.module.css';

function List({name}) {
  return (
    <div className={styles.listCard}>
      <h1 className={styles.listCardTitle}>{name}</h1>
      <div className={styles.divider}></div>
      <button>Add new item</button>
    </div>
  );
}

export default List;
