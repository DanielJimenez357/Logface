import Ticket_Panel from './Ticket_Panel.jsx'
import { NavLink } from 'react-router-dom'
import Ticket_Form from './Ticket_Form.jsx'
import { useState } from 'react'

function Ticket_System() {

  const [showForm, setShowForm ] = useState(false)

  const TabStyles = ({isActive}) => 
    `transition-colors p-3 border text-center w-[50%] border-negro1  rounded-b-lg ${isActive ? 'hover:bg-rojo2 bg-rojo1 text-white active:text-black active:bg-white' : 'hover:bg-gris1 bg-white active:bg-gris2'} `

  return (
  <>
      <div className="absolute top-0 w-[20vw] left-30 flex flex-row" >
        <NavLink end to="/incidencias" className={TabStyles}>Por resolver</NavLink>
        <NavLink to="resueltos" className={TabStyles}>Resueltas</NavLink>
      </div>
    <div className="w-11/12 h-11/12 mt-1 flex flex-col justify-end items-center overflow-hidden relative">
        <div className="flex flex-row h-10 items-end">
          <p>Lista de incidencias</p>
         <p onClick={() => setShowForm(!showForm)} className="absolute right-20 border text-white hover:text-black border-negro1 bg-gris2 hover:bg-gris1 hover:cursor-pointer active:bg-white transition-colors p-2 rounded-t-lg">Crear nueva incidencia</p> 
        </div>
        <Ticket_Panel />
        <Ticket_Form show={showForm} onClose={() => setShowForm(false)} />
    </div>
    </>
  )
}

export default Ticket_System
