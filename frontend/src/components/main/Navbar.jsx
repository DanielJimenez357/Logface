import Link_Header from './Link_Header.jsx'


function Navbar() {
  return (
  <>
    <div className="bg-gris1 flex  flex-col w-1/8 mr-2 border rounded-r-lg border-negro1 h-96">
      <Link_Header link_name="Panel principal" route="" />
      <Link_Header link_name="Calendario" /> 
      <Link_Header link_name="Incidencias" route="tickets"  /> 
      <Link_Header link_name="Zona managers" /> 
      <Link_Header link_name="Perfil" />
      <Link_Header link_name="Departamento" /> 
      <Link_Header link_name="Cerrar sesion" /> 
      </div>
    </>
  )
}

export default Navbar
