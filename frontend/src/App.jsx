import { Routes, Route } from 'react-router-dom'
import Layout from './components/main/Layout.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import Ticket_System from './components/ticket_system/Ticket_System.jsx'
import Ticket_Unresolved from './components/ticket_system/Ticket_Unresolved.jsx'
import Ticket_Resolved from './components/ticket_system/Ticket_Resolved.jsx'
import Calendar from './components/calendar/Calendar.jsx'
import Task_Set from './components/department/Task_Set.jsx'
import Profile from './components/profile/Profile.jsx'

function App() {
  return(
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="incidencias" element={<Ticket_System/>} >
          <Route index element={<Ticket_Unresolved/>} />
          <Route path="resueltos" element={<Ticket_Resolved/>} />
      </Route>
      <Route path="profile" element={<Profile/>} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="department" element={<Task_Set />} />
    </Route>
    </Routes>
  ) 
}

export default App
