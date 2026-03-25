import { Routes, Route } from 'react-router-dom'
import Layout from './components/main/Layout.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'

function App() {
  return(
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
    </Route>
    </Routes>
  ) 
}

export default App
