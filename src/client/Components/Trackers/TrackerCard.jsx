import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/trackercard.module.css';

function TrackerCard({ tracker }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tracker/${tracker.tracker_id}`);
  };

  return (
    <div onClick={handleClick} className={styles.trackerCard}>
      <span className={styles.trackerCardTitle}>{tracker.name}</span>
    </div>
  );
}

export default TrackerCard;
