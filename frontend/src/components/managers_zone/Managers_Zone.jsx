import List from './List.jsx'
import Departments from './Departments.jsx'
import Button from '../main/Button.jsx'
import General_Form from './General_Form.jsx'

function Manager_Zone() {

const form_list = {
    employee: {fields:[["nombre", "text"], ["apellidos", "text"], ["numero de telefono", "text"], ["contraseña" ,"password"], ["email", "email"]], url:""},
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
        <div>
          <General_Form fields={form_list.employee.fields} visible={true}/>
        </div>
       <div className="flex flex-col h-8/10 w-2/10">
         <List title="Empleados" content_list={datosDePrueba} />
         <Button title="Registrar nuevo empleado" /> 
        </div> 
        <div className="flex flex-col h-8/10 w-2/10">
          <List title="Tareas" content_list={datosDePrueba}/>
          <Button title="Crear nueva tarea" />
        </div>
        <div className="flex flex-col h-8/10 w-2/10 items-center">
          <Departments />
          <div className="h-7/20 flex flex-col justify-between">            
          <Button title="Crear nuevo departamento"/>
          <Button title="Crear nuevo horario"/>
          <Button title="Designar festivo"/>
          </div>

        </div>
      </div>
    </>
  )
}

export default Manager_Zone
