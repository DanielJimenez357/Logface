import List from './List.jsx'
import Departments from './Departments.jsx'
import Button from '../main/Button.jsx'
import General_Form from './General_Form.jsx'
import {ENDPOINTS} from '../../services/endpoints.js'
import { useState } from 'react'
import Create_Button from './Create_Button.jsx'

function Manager_Zone() {

  const [active, setActive] = useState(false)

const form_list = {
    employee: {fields:[["first_name", "text"], ["last_name", "text"], ["username", "text"], ["phone_number", "text"], ["password" ,"password"], ["email", "email"]], url:ENDPOINTS.REGISTER_LDAP},
    task: {fields:{}, url:""},
    department: {fields:{}, url:""},
    time_span: {fields:{}, url:""},
    holiday: {fields:{}, url:""}
  }


const datosDePrueba = [
    { id: 1, content: "Primer elemento de la lista" },
        { id: 2, content: "Segundo elemento con más texto" },
            { id: 3, content: "Tercer elemento para completar el diseño" }
              ];

  return (
  <>
      <div className="flex flex-row w-full h-full justify-around items-center">
        <div onClick={()=> setActive(false)} className={`${active ? "backdrop-blur-xs bg-black/40 rounded-lg absolute w-full h-full" :"hidden"}  transition-all"`}>
          <div onClick={(e) => e.stopPropagation()}>
            <General_Form fields={form_list.employee.fields} url={form_list.employee.url} visible={true}/>
          </div>
        </div>
       <div className="flex flex-col h-8/10 w-2/10">
         <List title="Empleados" content_list={datosDePrueba} />
        <Create_Button  onClick={()=> setActive(true)} content="Registrar nuevo empleado"/>
        </div> 
        <div className="flex flex-col h-8/10 w-2/10">
          <List title="Tareas" content_list={datosDePrueba}/>
          <Create_Button  onClick={()=> setActive(true)} content="Crear nueva tarea" />
        </div>
        <div className="flex flex-col h-8/10 w-2/10 items-center">
          <Departments />
          <div className="h-7/20 flex flex-col justify-between">            
          <Create_Button onClick={()=> setActive(true)} content="Crear nuevo departamento" />
          <Create_Button  onClick={()=> setActive(true)} content="Crear nuevo horario" />
          <Create_Button  onClick={()=> setActive(true)} content="Designar festivo" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager_Zone
