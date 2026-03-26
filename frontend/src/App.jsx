import { Routes, Route } from 'react-router-dom'
import Layout from './components/main/Layout.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import Ticket_System from './components/ticket_system/Ticket_System.jsx'

function App() {
  return(
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="tickets" element={<Ticket_System/>} />
    </Route>
    </Routes>
  ) 
}

export default App
