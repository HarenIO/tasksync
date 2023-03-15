import React, { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs';
import { useAuth } from '../../Context/AuthContext'
import axios from 'axios'

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
    <Tabs.Content className="TabsContent" value="tab1">
      <form onSubmit={handleSubmit}>
        {loginError ? <p className="Text" style={{color:'red'}}>{loginError}</p> : <p className="Text">Login to your account.</p>}
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">Username</label>
          <input className="Input" id="username" onChange={handleChange} />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="password">Password</label>
          <input className="Input" type="password" id="password" onChange={handleChange} />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="Button green">Login</button>
        </div>
      </form>
    </Tabs.Content>
  )
}

export default LoginTab