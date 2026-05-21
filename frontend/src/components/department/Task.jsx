import {useDraggable} from '@dnd-kit/react'


function Task({id, content, description, onClick, setDetailsDescription, setDetailsImplicated, implicated}) {

  const {ref} = useDraggable({
    id,
  })

  return (
  <>
    <div ref={ref} onClick={()=>{onClick(); setDetailsDescription(description); console.log(description); setDetailsImplicated(implicated)}} className="p-1 border border-negro1 hover:bg-rojo2 hover:text-white transition-colors hover:cursor-pointer active:brightness-120">
      <p>{content}</p>
    </div>
    </>
  )
}

export default Task
