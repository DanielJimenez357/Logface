import Link_Header from './Link_Header.jsx'
import { AuthContext } from '../../context/Auth_Context.jsx'
import { useContext } from 'react'

function Navbar() {
  const { user } = useContext(AuthContext)

  const log_out = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <>
      <div className="bg-gris1 flex flex-row lg:flex-col w-full lg:w-[15%] h-16 lg:h-[75%] mr-0 lg:mr-2 text-[70%] lg:text-[100%] mb-4 lg:mb-0 rounded-lg lg:rounded-r-lg shadow shadow-gris2 p-2 gap-2 justify-start items-center lg:items-stretch overflow-x-auto lg:overflow-x-visible flex-nowrap lg:flex-wrap scrollbar-none">
        <Link_Header link_name="Panel principal" route="" />
        <Link_Header link_name="Incidencias" route="incidencias" /> 
        {user?.role === "manager" && <Link_Header link_name="Zona managers" route="managers_zone" /> }
        <Link_Header link_name="Perfil" route="profile" />
        <Link_Header link_name="Departamento" route="department" /> 
        <Link_Header onClick={log_out} link_name="Cerrar sesion" route="login" /> 
      </div>
    </>
  )
}

export default Navbar
