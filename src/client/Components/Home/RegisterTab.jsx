import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import axios from 'axios';
import styles from './styles/loginregister.module.css'
import { useNavigate } from 'react-router-dom'

function RegisterTab({ setSelectedTab }) {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      setRegisterError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('https://tasksync-backend.onrender.com/auth/register', userInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        setRegisterError('');
        setRegisterSuccess('Successfully registered! Redirecting..');
        setTimeout(() => setSelectedTab('tab1'), 1000)
      }
    } catch (error) {
      setRegisterError(error.response.data.error);
      setRegisterSuccess('');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  return (
    <Tabs.Content className={styles.TabsContent} value="tab2">
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {registerError ? (
            <p className={styles.Text} style={{ color: "red" }}>
              {registerError}
            </p>
          ) : registerSuccess ? (
            <p className={styles.Text} style={{ color: "green" }}>
              {registerSuccess}
            </p>
          ) : (
            <p className={styles.Text}>Create a new account.</p>
          )}
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="username">
              Username
            </label>
            <input
              className={styles.Input}
              id="username"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.Input}
              type="password"
              id="password"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={styles.Input}
              type="password"
              id="confirmPassword"
              onChange={handleChange}
            />
          </fieldset>
          <button className={styles.Button}>Register</button>
        </form>
      </div>
    </Tabs.Content>
  );
}

export default RegisterTab;
