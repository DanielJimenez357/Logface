import Link_Header from './Link_Header.jsx'


function Navbar() {
  return (
  <>
    <div className="bg-gris1 flex  flex-col w-1/8 mr-2  rounded-r-lg  h-[70%] shadow shadow-gris2">
      <Link_Header link_name="Panel principal" route="" />
      <Link_Header link_name="Calendario" route="calendar" /> 
      <Link_Header link_name="Incidencias" route="incidencias"  /> 
      <Link_Header link_name="Zona managers" /> 
      <Link_Header link_name="Perfil" />
      <Link_Header link_name="Departamento" route="department" /> 
      <Link_Header link_name="Cerrar sesion" /> 
      </div>
    </>
  )
}

export default Navbar
