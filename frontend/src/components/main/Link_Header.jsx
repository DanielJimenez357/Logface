import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

function Link_Header({link_name, route, onClick}) {

  const linkStyle = ({ isActive }) => {

    const styles = "transition-all "
     return isActive 
      ? `${styles}text-white hover:bg-rojo2 `
      : `${styles}text-negro1 hover:bg-gris2 `
   }

  return (
  <>
      <motion.div
      whileHover={{
          x: 20,
          transition: {type: "spring", stiffness: 300, damping: 20}
        }}
      whileTap={{ scale: .95}}
        className="w-full"
      >
        <NavLink to={`/${route}`} className={({ isActive }) =>
            `transition-all hover:cursor-pointer rounded-xl p-3 w-full block ${
              isActive
                ? "text-white bg-rojo2 hover:bg-rojo1"
                : "text-negro1 bg-white hover:bg-gris2"
            }`
          }onClick={onClick} >
          {link_name}
        </NavLink>
      </motion.div>
    </>
  )
}

export default Link_Header
