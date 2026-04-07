import Ticket_Panel from './Ticket_Panel.jsx'
import { NavLink } from 'react-router-dom'

function Ticket_System() {

  const TabStyles = ({isActive}) => 
    `transition-colors p-3 border text-center w-[50%] border-negro1  rounded-b-lg ${isActive ? 'bg-rojo1' : 'bg-white'} `

  return (
  <>
      <div className="absolute top-0 w-[20vw] left-30 flex flex-row">
        <NavLink end to="/incidencias" className={TabStyles}>Por resolver</NavLink>
        <NavLink to="resueltos" className={TabStyles}>Resueltas</NavLink>
      </div>
    <div className="w-11/12 h-11/12 mt-1 flex flex-col justify-end items-center">
        <div className="flex flex-row h-10 items-end">
          <p>Lista de incidencias por resolver</p>
         <p className="absolute right-40 border border-negro1 bg-gris2 hover:bg-gris1 hover:cursor-pointer active:bg-white transition-colors p-2 rounded-t-lg">Crear nueva incidencia</p> 
        </div>
        <Ticket_Panel />
    </div>
    </>
  )
}

export default Ticket_System
