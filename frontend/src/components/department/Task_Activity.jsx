import Task from './Task.jsx'
import {useDroppable} from '@dnd-kit/react'
function Task_Activity({id, title, onTaskClick, task, setDetailsImplicated, setDetailsDescription}) {

  const {ref} = useDroppable({
    id
  }) 

  return (
  <>
    <div ref={ref} className="border border-negro1 rounded-b-md rounded-t-lg bg-white overflow-hidden w-9/30 shadow shadow-gris2">
      <p className="bg-gris2 text-white border-b border-negro1 text-2xl text-center">{title}</p>
        <div>
          {task.map((item, index) => (
            <Task id={item.id} implicated={item.implicated_names} setDetailsImplicated={setDetailsImplicated} setDetailsDescription={setDetailsDescription} content={item.nombre} description={item.descripcion} onClick={onTaskClick} />
          ))}
        </div>
    </div>
    </>
  )
}

export default Task_Activity
