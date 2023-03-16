import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRegister from '../Components/Home/LoginRegister';
import { useAuth } from '../Context/AuthContext';
import styles from './styles/home.module.css';

function Home() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/profile');
    }
  }, [loggedIn, navigate]);

  return (
    <>
      {!loggedIn && (
        <div className={styles.container}>
          <h1 className={styles.title}>Task Sync</h1>
          <p className={styles.subtitle}>
            A collaborative todo app to keep your tasks synchronized and organized
            with your team.
          </p>
          <LoginRegister />
        </div>
      )}
    </>
  );
}

export default Home;
