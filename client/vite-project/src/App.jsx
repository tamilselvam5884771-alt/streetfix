import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <div className="footer">
        <p>Made with ❤️ by <a href="#" target="_blank">StreetFix Team</a></p>
      </div>
    </>
  )
}

export default App
