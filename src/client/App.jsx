import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Trackers from './Pages/Trackers'
import ProtectedRoutes from './Components/ProtectedRoutes'
import { useAuth } from './Context/AuthContext'

function App() {

  const { loading } = useAuth();

  if (loading) {
    return <></>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoutes />} >
            <Route path="/trackers" element={<Trackers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
