function Task({content, description, onClick}) {
  return (
  <>
    <div onClick={onClick} className="p-1 border border-negro1 hover:bg-rojo2 hover:text-white transition-colors hover:cursor-pointer active:brightness-120">
      <p>{content}</p>
    </div>
    </>
  )
}

export default Task
