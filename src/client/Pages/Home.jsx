import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginRegister from '../Components/Home/LoginRegister'
import { useAuth } from '../Context/AuthContext'


function Home() {
  const {loggedIn} = useAuth()
  const navigate = useNavigate();

  React.useEffect(() => {
    if(loggedIn){
      navigate('/profile')
    }
  }, [loggedIn, history])

  return (
    <>
      {!loggedIn && (
        <>
         <h1>Home page!</h1> 
        <LoginRegister />
        </>
      )}
    </>
  )
}

export default Home