import Link_Header from './Link_Header.jsx'


function Navbar() {
  return (
  <>
    <div className="bg-gris1 flex  flex-col w-1/8 mr-2 border rounded-r-lg border-negro1 h-96">
      <Link_Header Nombre_link="Panel principal" />
      <Link_Header Nombre_link="Calendario" /> 
      <Link_Header Nombre_link="Incidencias"  /> 
      <Link_Header Nombre_link="Zona managers" /> 
      <Link_Header Nombre_link="Perfil" />
      <Link_Header Nombre_link="Departamento" /> 
      <Link_Header Nombre_link="Cerrar sesion" /> 
      </div>
    </>
  )
}

export default Navbar
