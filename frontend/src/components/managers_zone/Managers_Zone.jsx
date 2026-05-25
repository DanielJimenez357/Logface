import List from './List.jsx'
import Departments from './Departments.jsx'
import Button from '../main/Button.jsx'
import General_Form from './General_Form.jsx'
import {ENDPOINTS} from '../../services/endpoints.js'
import { useState, useEffect } from 'react'
import Create_Button from './Create_Button.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import apiDjango from '../../services/api.js'

function Manager_Zone() {

  const [employees, setEmployees] = useState([])
  const [tasks, setTasks] = useState([])
  const [active, setActive] = useState(false)
  const [fields, setFields] = useState([])
  const [url, setUrl] = useState("")
  const [loading_employee, setLoading_employee] = useState(false)
  const [loading_tasks, setLoading_tasks] = useState(false)
  const [activeForm, setActiveform] = useState(null)
  const [department, setDepartment] = useState(1)


  console.log("departamento es: " +department)
  const fetchEmployee = async ()=>{
          try {

              const url = `${ENDPOINTS.EMPLOYEE}?departamento=${department}`

              setLoading_employee(true)
              const response = await apiDjango.get(url)
              console.log(response.data)
              setEmployees(response.data)
              /*if (response.data == [])
               *           response.data[0] = "No hay empleados en este departamento"*/
              setLoading_employee(false)
            } catch (error){
              console.error ("Error en la carga de los empleados", error)
            }
          finally{
              setLoading_employee(false)
            }
        }

  const fetchTask = async ()=>{
          try {
               const url = `${ENDPOINTS.TASK}?departamento=${department}`
              setLoading_tasks(true)
              const response = await apiDjango.get(url)
              console.log(response.data)
              setTasks(response.data)
             /* if (response.data == [])
        *           response.data.push({username: "No hay tareas en este departamento"})*/
              setLoading_tasks(false)
            } catch (error){
              console.error ("Error en la carga de las tareas", error)
            }
          finally{
              setLoading_tasks(false)
            }
        } 

  const handleFormSubmit = () =>{
    setActiveform(null)
    console.log("me han llamado")

    if (activeForm == 'employee') fetchEmployee()
    if (activeForm == 'task') fetchTask()

  }

  useEffect(()=> {fetchEmployee()}, [department])
  useEffect(()=> {fetchTask()}, [department])



  
const form_list = {
    employee: {fields:[["first_name", "text"], ["role", "checkbox" ] ,["last_name", "text"], ["departamento", "hidden", department], ["username", "text"], ["phone_number", "text"], ["password" ,"password"], ["email", "email"]], url:ENDPOINTS.REGISTER_LDAP},
    task: {fields:[["departamento", "hidden", department], ["nombre", "text"], ["implicados", "multiselect", employees], ["descripcion", "text"]], url:ENDPOINTS.TASK},
    department: {fields:[["nombre", "text"]], url:ENDPOINTS.DEPARTMENT},
    time_span: {fields:[["horario", "text"], ["hora_entrada", "time"], ["hora_salida", "time"]], url:""},
    holiday: {fields:[["day", "date"]], url:""}
  }


  return (
  <>
      <div className="flex flex-row w-full h-full justify-around items-center">
      <AnimatePresence>
          {activeForm && (
          <motion.div initial={{opacity:0}} animate={{ opacity:1 }} exit={{opacity:0}} onClick={()=> setActiveform(null)} className="backdrop-blur-xs bg-black/40 rounded-lg absolute w-full h-full">
            <div onClick={(e) => e.stopPropagation()}>
              <General_Form key={activeForm} fields={form_list[activeForm].fields} url={form_list[activeForm].url} onSuccess={handleFormSubmit} visible={true}/>
            </div>
          </motion.div>
          )}
             </AnimatePresence>
       <div className="flex flex-col h-8/10 w-2/10">
          <List title="Empleados" content_list={employees} loading={loading_employee} />
          <Create_Button  onClick={()=> {setActiveform('employee')}} content="Registrar nuevo empleado"/>
        </div> 
        <div className="flex flex-col h-8/10 w-2/10">
          <List title="Tareas" content_list={tasks} loading={loading_tasks}/>
          <Create_Button  onClick={()=> {setActiveform('task')}} content="Crear nueva tarea" />
        </div>
        <div className="flex flex-col h-8/10 w-2/10 items-center">
          <Departments setDepartment={setDepartment} />
          <div className="h-7/20 flex flex-col justify-between">            
            <Create_Button onClick={()=> {setActiveform('department')}} content="Crear nuevo departamento" />
            <Create_Button  onClick={()=> {setActiveform('time_span'); setFields(form_list.time_span.fields); setUrl(form_list.time_span.url)}} content="Crear nuevo horario" />
            <Create_Button  onClick={()=> {setActiveform('holiday'); setFields(form_list.holiday.fields); setUrl(form_list.holiday.url)}} content="Designar festivo" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager_Zone
