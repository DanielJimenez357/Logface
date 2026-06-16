import Ticket_Panel from './Ticket_Panel.jsx'
import { NavLink } from 'react-router-dom'
import Ticket_Form from './Ticket_Form.jsx'
import { useState } from 'react'

function Ticket_System() {
  const [showForm, setShowForm] = useState(false)

  const TabStyles = ({isActive}) =>
    `transition-colors px-6 py-2 border border-t-0 text-center font-bold border-negro1 shadow shadow-gris2 rounded-b-lg text-sm ${
      isActive
        ? 'bg-rojo1 text-white'
        : 'bg-white text-negro1 hover:bg-gray-100'
    }`

  return (
    <div className="w-full h-full flex flex-col relative px-4 lg:px-8">
      
      <div className="absolute top-0 left-8 flex flex-row gap-2 z-10">
        <NavLink end to="/incidencias" className={TabStyles}>Por resolver</NavLink>
        <NavLink to="resueltos" className={TabStyles}>Resueltas</NavLink>
      </div>

      <div className="flex flex-col w-full h-full pt-16 pb-4">
        
        <div className="flex flex-row justify-between items-end w-full">
          <h2 className="font-bold text-xl text-gray-800 pb-2 pl-2">Lista de incidencias</h2>
          
          <button
            onClick={() => setShowForm(true)}
            className="bg-gris2 text-white hover:bg-black border border-negro1 border-b-0 rounded-t-lg px-5 py-2 font-semibold text-sm transition-colors cursor-pointer"
          >
            + Crear nueva incidencia
          </button>
        </div>

        <div className="flex-1 w-full min-h-0">
          <Ticket_Panel />
        </div>

      </div>

      <Ticket_Form show={showForm} onClose={() => setShowForm(false)} />
      
    </div>
  )
}

export default Ticket_System
