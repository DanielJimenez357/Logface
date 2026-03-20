import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import Main_Panel from './components/Main_Panel.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <div className="w-full h-[80vh] flex row-auto mt-12">
      <Navbar />
      <Main_Panel />
    </div>
     </StrictMode>,
)
