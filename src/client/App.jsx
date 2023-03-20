import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Tracker from './Pages/Tracker'
import ProtectedRoutes from './Components/ProtectedRoutes'
import NotFound from './Pages/NotFound'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/tracker/:id" element={<Tracker />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
