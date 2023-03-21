import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import styles from './navbar.module.css';

export default function Navbar() {
  const { loggedIn, setLoggedIn, user } = useAuth();
  const handleLogout = async () => {
    try {
      const res = await fetch('https://tasksync-api.haren.io/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loggedIn) {
    return (
      <nav className={styles.navbar}>
        <p className={styles.loggedInText}>Logged in as {user.username}</p>
        <ul className={styles.navList}>
          <li>
            <Link className={styles.navItem} to="/profile">
              My Trackers
            </Link>
          </li>
          <li>
            <Link className={styles.navItem} onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
