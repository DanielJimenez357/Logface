import Link_Header from './Link_Header.jsx'
import {AuthContext} from '../../context/Auth_Context.jsx'
import { useContext } from 'react'

function Navbar() {

  const { setUser } = useContext(AuthContext)

  const log_out = () => {
    localStorage.clear()
  }

  return (
  <>
    <div className="bg-gris1 flex   flex-col w-1/8 mr-2  rounded-r-lg  h-[70%] shadow shadow-gris2">
      <Link_Header link_name="Panel principal" route="" />
      <Link_Header link_name="Calendario" route="calendar" /> 
      <Link_Header link_name="Incidencias" route="incidencias"  /> 
      <Link_Header link_name="Zona managers" route="managers_zone" /> 
      <Link_Header link_name="Perfil" route="profile"/>
      <Link_Header link_name="Departamento" route="department" /> 
      <Link_Header onClick={log_out} link_name="Cerrar sesion" route="login" /> 
      </div>
    </>
  )
}

export default Navbar
