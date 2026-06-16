import { motion } from 'framer-motion'

function Create_Button({ onClick, active, content }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      className={`
        m-1
        relative overflow-hidden
        bg-gris2 text-white
        rounded-xl
        px-6 py-2.5
        text-sm font-medium tracking-wide
        cursor-pointer
        transition-all duration-200
        hover:brightness-110
        active:brightness-75
        ${active ? 'ring-2 ring-white ring-offset-2 ring-offset-gris2' : ''}
      `}
    >
      {content}
    </motion.button>
  )
}

export default Create_Button
