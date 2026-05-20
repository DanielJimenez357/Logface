import Task_Activity from './Task_Activity.jsx'
import Task_Details from './Task_Details.jsx'
import {ENDPOINTS} from '../../services/endpoints.js'
import { useState, useEffect } from 'react'
import apiDjango from '../../services/api.js'
import { AuthContext } from '../../context/Auth_Context.jsx'
import {useContext} from 'react'

function Task_Set({title}) {
  const [showDetails, setShowDetails ] = useState(false)
  const [tasks, setTasks] = useState([])
  const [pendingTask, setPendingTask] = useState([])
  const [activeTask, setActiveTask] = useState([])
  const [CompletedTask, setCompletedTask] = useState([])
  
  const context = useContext(AuthContext)
  const user = context.user
  
  const fetchTask = async ()=>{
    try {
      const url = `${ENDPOINTS.TASK}?departamento=${user.departamento}`
      //setLoading_tasks(true)
      const response = await apiDjango.get(url)
      console.log(response.data)
      setTasks(response.data)
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


  return (
  <>
    <div className="w-full h-full content-center">
        <Task_Details show={showDetails} onClose={()=> setShowDetails(false)} />
      <p className="absolute top-0 right-30 bg-white border border-negro1 rounded-b-lg p-2 pl-6 pr-6">Marketing</p>
        <div className="w-full h-17/20 flex flex-row justify-around">
        <Task_Activity title="Pendientes" onTaskClick={handleOpenPanel}/>
        <Task_Activity title="Activos" onTaskClick={handleOpenPanel}/>
        <Task_Activity title="Completados" onTaskClick={handleOpenPanel}/>
        </div>
    </div>
    </>
  )
}

export default Task_Set
