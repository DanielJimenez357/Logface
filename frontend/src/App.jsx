import { Routes, Route } from 'react-router-dom'
import Layout from './components/main/Layout.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import Ticket_System from './components/ticket_system/Ticket_System.jsx'
import Ticket_Unresolved from './components/ticket_system/Ticket_Unresolved.jsx'
import Ticket_Resolved from './components/ticket_system/Ticket_Resolved.jsx'
import Calendar from './components/calendar/Calendar.jsx'
import Task_Set from './components/department/Task_Set.jsx'
import Profile from './components/profile/Profile.jsx'
import Managers_Zone from './components/managers_zone/Managers_Zone.jsx'
import Login from './components/login/Login.jsx'
import Protected_Route from './services/protected_route.jsx'
import AuthProvider from './context/Auth_Context.jsx'

function App() {
  return(
    <AuthProvider>
    <Routes>
    <Route path="/" element={
        <Protected_Route>
          <Layout />
        </Protected_Route>}>
      <Route index element={<Dashboard />} />
      <Route path="incidencias" element={<Ticket_System/>} >
          <Route index element={<Ticket_Unresolved/>} />
          <Route path="resueltos" element={<Ticket_Resolved/>} />
      </Route>
      <Route path="managers_zone" element={<Managers_Zone />} />
      <Route path="profile" element={<Profile/>} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="department" element={<Task_Set />} />
    </Route>
       <Route path="login" element={<Login />} />

    </Routes>
    </AuthProvider>

  ) 
}

export default App
