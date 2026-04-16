import { NavLink } from 'react-router-dom'

function Link_Header({link_name, route}) {

  const linkStyle = ({ isActive }) => {

    const styles = "hover:text-white hover:cursor-pointer border border-negro1 rounded-r-xl p-1.5 hover:-translate-x-25 w-[150%] text-end shadow shadow-gris2 transition-all -translate-x-30  "
     return isActive 
      ? `${styles} bg-rojo1 text-white hover:bg-rojo2 `
      : `${styles} bg-white text-negro1 hover:bg-gris2 `
   }

  return (
  <>
    <NavLink to={`/${route}`} className={linkStyle} >
      <p>{link_name}</p>
    </NavLink>

    </>
  )
}

export default Link_Header
