import List from './List.jsx'
import Departments from './Departments.jsx'
import General_Form from './General_Form.jsx'
import { ENDPOINTS } from '../../services/endpoints.js'
import { useState, useEffect } from 'react'
import Create_Button from './Create_Button.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import apiDjango from '../../services/api.js'

function Manager_Zone() {
  const [employees, setEmployees] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading_employee, setLoading_employee] = useState(false)
  const [loading_tasks, setLoading_tasks] = useState(false)
  const [activeForm, setActiveform] = useState(null)
  const [department, setDepartment] = useState(1)

  const download_employee = async () => {
    try {
      const response = await apiDjango.get(ENDPOINTS.EXPORT_EMPLOYEES, {
        responseType: 'blob', 
      })
      const blob = new Blob([response.data], { type: 'text/csv' })
      const urlDownload = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = urlDownload
      link.setAttribute('download', 'lista_empleados.csv') 
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(urlDownload)
    } catch (error) {
      console.error("Error al descargar el archivo", error)
      alert("Hubo un error al exportar los datos.")
    }
  }

  const fetchEmployee = async () => {
    try {
      const url = `${ENDPOINTS.EMPLOYEE}?departamento=${department}`
      setLoading_employee(true)
      const response = await apiDjango.get(url)
      const datos = response.data.results ? response.data.results : response.data
      setEmployees(datos)
    } catch (error) {
      console.error("Error en la carga de los empleados", error)
    } finally {
      setLoading_employee(false)
    }
  }

  const fetchTask = async () => {
    try {
      const url = `${ENDPOINTS.TASK}?departamento=${department}`
      setLoading_tasks(true)
      const response = await apiDjango.get(url)
      const datos = response.data.results ? response.data.results : response.data
      setTasks(datos)
    } catch (error) {
      console.error("Error en la carga de las tareas", error)
    } finally {
      setLoading_tasks(false)
    }
  } 

  const handleFormSubmit = () => {
    setActiveform(null)
    if (activeForm === 'employee') fetchEmployee()
    if (activeForm === 'task') fetchTask()
  }

  useEffect(() => { fetchEmployee() }, [department])
  useEffect(() => { fetchTask() }, [department])

  const form_list = {
    employee: {
      fields: [
        ["first_name", "text"], 
        ["last_name", "text"], 
        ["username", "text"], 
        ["email", "email"],
        ["password", "password"], 
        ["phone_number", "text"], 
        ["role", "checkbox"],
        ["departamento", "hidden", department]
      ], 
      url: ENDPOINTS.REGISTER_LDAP
    },
    task: {
      fields: [
        ["nombre", "text"], 
        ["descripcion", "text"],
        ["implicados", "multiselect", employees], 
        ["departamento", "hidden", department]
      ], 
      url: ENDPOINTS.TASK
    },
    department: {
      fields: [["nombre", "text"]], 
      url: ENDPOINTS.DEPARTMENT
    },
    time_span: {
      fields: [["horario", "text"], ["hora_entrada", "time"], ["hora_salida", "time"]], 
      url: ""
    },
    holiday: {
      fields: [["day", "date"]], 
      url: ""
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full h-full justify-around items-center relative p-4">
        
        <AnimatePresence>
          {activeForm && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setActiveform(null)} 
              className="backdrop-blur-xs bg-black/40 rounded-lg absolute w-full h-full z-50 top-0 left-0 flex justify-center items-center"
            >
              <div onClick={(e) => e.stopPropagation()}>
                <General_Form 
                  key={activeForm} 
                  fields={form_list[activeForm].fields} 
                  url={form_list[activeForm].url} 
                  onSuccess={handleFormSubmit} 
                  visible={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col w-8/10 h-8/10 lg:w-2/10 gap-2">
          <List title="Empleados" content_list={employees} loading={loading_employee} />
          <Create_Button onClick={() => setActiveform('employee')} content="Registrar nuevo empleado" />
          <Create_Button onClick={download_employee} content="Obtener lista de empleados" />
        </div> 

        <div className="flex flex-col w-8/10 h-8/10 lg:w-2/10 gap-2">
          <List title="Tareas" content_list={tasks} loading={loading_tasks} />
          <Create_Button onClick={() => setActiveform('task')} content="Crear nueva tarea" />
        </div>

        <div className="flex flex-col w-8/10 h-8/10 lg:w-2/10 items-center justify-between gap-4">
          <div className="w-full flex-1">
            <Departments setDepartment={setDepartment} />
          </div>
          <div className="flex flex-col gap-2 w-full"> 
            <Create_Button onClick={() => setActiveform('department')} content="Crear nuevo departamento" />
            <Create_Button onClick={() => setActiveform('time_span')} content="Crear nuevo horario" />
            <Create_Button onClick={() => setActiveform('holiday')} content="Designar festivo" />
          </div>
        </div>

      </div>
    </>
  )
}

export default Manager_Zone
