import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';

export default function Navbar() {

  const { loggedIn, setLoggedIn, user } = useAuth();
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5050/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      if (res.ok) {
        setLoggedIn(false)
      }
    } catch (error) {
      console.error(error)
    }

  }

  if (loggedIn) {
    return (
      <nav>
        <ul style={{ display: "flex", gap: "1rem", alignItems: 'center' }}>
          <p>Logged in as {user.username}</p>
          <Link to="/profile">My Trackers</Link>
          <Link onClick={handleLogout}>Logout</Link>
        </ul>
      </nav>
    )
  }

}
