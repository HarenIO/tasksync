import React, { useState } from 'react';
import TrackersList from '../Components/Trackers/TrackersList';
import CreateTracker from '../Components/Trackers/CreateTracker';
import styles from './profile.module.css';

function Profile() {
  const [trackersUpdated, setTrackersUpdated] = useState(false);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Trackers</h1>
        <CreateTracker setTrackersUpdated={setTrackersUpdated} />
      </div>
      <TrackersList trackersUpdated={trackersUpdated} setTrackersUpdated={setTrackersUpdated} />
    </div>
  );
}

export default Profile;
