import { Routes, Route } from 'react-router-dom'
import Layout from './components/main/Layout.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import Ticket_System from './components/ticket_system/Ticket_System.jsx'
import Ticket_Unresolved from './components/ticket_system/Ticket_Unresolved.jsx'
import Ticket_Resolved from './components/ticket_system/Ticket_Resolved.jsx'


function App() {
  return(
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="incidencias" element={<Ticket_System/>} >
          <Route index element={<Ticket_Unresolved/>} />
          <Route path="resueltos" element={<Ticket_Resolved/>} />
      </Route>
    </Route>
    </Routes>
  ) 
}

export default App
