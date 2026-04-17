import Task from './Task.jsx'

function Task_Activity({title, onTaskClick}) {

  const task_test = [
    {content: "prueba", description: "una descripcion de prueba"},
    {content: "segunda tarea" , description: "segund prueba de descripcion"}
  ]



  return (
  <>
    <div className="border border-negro1 rounded-b-md rounded-t-lg bg-white overflow-hidden w-9/30 shadow shadow-gris2">
      <p className="bg-gris2 text-white border-b border-negro1 text-2xl text-center">{title}</p>
        <div>
          {task_test.map((item, index) => (
            <Task content={item.content} description={item.description} onClick={onTaskClick} />
          ))}
        </div>
    </div>
    </>
  )
}

export default Task_Activity
