function List_Component({ content, id, setDepartment }) {
  const handleClick = () => {
    if (setDepartment && id) {
      setDepartment(id)
    }
  }

  return (
    <>
      <p 
        onClick={handleClick} 
        className="border border-negro1 bg-white hover:bg-gris1 hover:text-gray-800 transition-colors duration-150 rounded-lg p-2.5 my-1 text-sm font-semibold cursor-pointer text-center active:scale-98"
      >
        {content}
      </p>
    </> 
  )
}

export default List_Component
