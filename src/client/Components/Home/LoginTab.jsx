import React, { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs';
import { useAuth } from '../../Context/AuthContext'
import axios from 'axios'
import styles from './loginregister.module.css'

function LoginTab() {

  const [userInfo, setUserInfo] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const { setLoggedIn, setUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5050/auth/login', userInfo, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (response.status === 200) {
        setUser({username: response.data.username, id: response.data.id})
        setLoggedIn(true)
      }
    } catch (error) {
      setLoginError(error.response.data.error)
    }
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  }

  return (
    <Tabs.Content className={styles.TabsContent} value="tab1">
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
        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "flex-end",
          }}
        >
          <button className={`${styles.Button} green`}>Login</button>
        </div>
      </form>
    </Tabs.Content>
  )
}

export default LoginTab