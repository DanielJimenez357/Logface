import Task_Activity from './Task_Activity.jsx'
import Task_Details from './Task_Details.jsx'
import {ENDPOINTS} from '../../services/endpoints.js'
import { useState, useEffect } from 'react'
import apiDjango from '../../services/api.js'
import { AuthContext } from '../../context/Auth_Context.jsx'
import {useContext} from 'react'
import {DragDropProvider} from '@dnd-kit/react'

function Task_Set({title}) {
  const [detailsDescription, setDetailsDescription] = useState("")
  const [detailsImplicated, setDetailsImplicated] = useState([]) 
  const [showDetails, setShowDetails ] = useState(false)
  const [tasks, setTasks] = useState([])
  const [pendingTask, setPendingTask] = useState([])
  const [activeTask, setActiveTask] = useState([])
  const [completedTask, setCompletedTask] = useState([])
  
  const context = useContext(AuthContext)
  const user = context.user
  if (context.loading || !user){
    return <p>Cargando...</p>
  }


  const handleDragEnd = async (event) => {
    console.log("me estan arrastrando")
    if (event.canceled){
      console.log("me han cancelado")
      return
    } 

    const { target, source } = event.operation

    if (!target){

      console.log("no soy un objetivo")
      return
    } 

    const taskId = source.id
    const newState = target.id

    try {
      await apiDjango.patch(`${ENDPOINTS.TASK}${taskId}/`, {state: newState})
      fetchTask()
    } catch (error){
      console.error("Algo ha salido mal con la actualizacion de estados de la tarea", error)
    }
  }
  
  const fetchTask = async ()=>{
    try {
      const url = `${ENDPOINTS.TASK}?departamento=${user.departamento}`
      //setLoading_tasks(true)
      const response = await apiDjango.get(url)

      const responsePendingTask = response.data.filter(task=> task.state === "pending")
      setPendingTask(responsePendingTask)

      const responseActiveTask = response.data.filter(task=> task.state === "active")
      setActiveTask(responseActiveTask)

      const responseCompletedTask = response.data.filter(task=> task.state === "completed")
      setCompletedTask(responseCompletedTask)
      //setLoading_tasks(false)
    } catch (error){
    console.error ("Error en la carga de las tareas", error)
    }
    finally{
      //setLoading_tasks(false)
    }
  } 

  useEffect(()=> {fetchTask()}, [])

  const handleOpenPanel = () => {
    setShowDetails(true);
  };

  console.log(pendingTask)


  return (
  <>
    <div className="w-full h-full content-center">
        <Task_Details description={detailsDescription} implicated={detailsImplicated} show={showDetails} onClose={()=> setShowDetails(false)} />
      <p className="absolute top-0 right-30 bg-white border border-negro1 rounded-b-lg p-2 pl-6 pr-6">{user.department_name}</p>
        <div className="w-full h-17/20 flex flex-row justify-around">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <Task_Activity id="pending" setDetailsImplicated={setDetailsImplicated} setDetailsDescription={setDetailsDescription} task={pendingTask} title="Pendientes" onTaskClick={handleOpenPanel}/>
        <Task_Activity id="active" setDetailsImplicated={setDetailsImplicated} setDetailsDescription={setDetailsDescription} task={activeTask} title="Activos" onTaskClick={handleOpenPanel}/>
        <Task_Activity id="completed" setDetailsImplicated={setDetailsImplicated} setDetailsDescription={setDetailsDescription} setDetailsImplicated={setDetailsImplicated} setDetailsDescription={setDetailsDescription} task={completedTask} title="Completados" onTaskClick={handleOpenPanel}/>
      </DragDropProvider>
        </div>
    </div>
    </>
  )
}

export default Task_Set
