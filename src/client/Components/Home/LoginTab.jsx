import React, { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs';
import { useAuth } from '../../Context/AuthContext'
import axios from 'axios'
import styles from './styles/loginregister.module.css'

function LoginTab() {

  const [userInfo, setUserInfo] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const { setLoggedIn, setUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://tasksync-backend.onrender.com/auth/login', userInfo, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (response.status === 200) {
        setUser({ username: response.data.username, id: response.data.id })
        setLoggedIn(true)
      }
    } catch (error) {
      setLoginError('Invalid username or password')
    }
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  }

  return (
    <Tabs.Content className={styles.TabsContent} value="tab1">
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {loginError ? (
            <p className={styles.Text} style={{ color: "red" }}>
              {loginError}
            </p>
          ) : (
            <p className={styles.Text}>Login to your account.</p>
          )}
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="username">
              Username
            </label>
            <input
              className={styles.Input}
              id="username"
              onChange={handleChange}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
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
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </fieldset>
          <button className={styles.Button}>Login</button>
        </form>
      </div>
    </Tabs.Content>
  )
}

export default LoginTab