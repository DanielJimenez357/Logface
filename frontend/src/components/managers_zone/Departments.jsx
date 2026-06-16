import List_Component from './List_Component.jsx'
import apiDjango from '../../services/api.js'
import { useState, useEffect } from 'react'
import { ENDPOINTS } from '../../services/endpoints.js'

function Departments({ setDepartment }) {
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await apiDjango.get(ENDPOINTS.DEPARTMENT)
        const datos = response.data.results ? response.data.results : response.data
        setDepartments(datos)
      }
      catch(error) {
        console.error("Error carga departamentos", error)
      }
    }
    fetchDepartments()
  }, [])

  return (
    <>
      <div className="bg-white rounded-lg border border-negro1 h-6/10 w-full mb-4 flex flex-col overflow-hidden shadow shadow-gris2">
        <p className="bg-gris2 text-white text-center font-bold p-1.5 border-b border-negro1">Departamentos</p>
        <div className="overflow-y-auto flex-1 p-2 bg-gray-50">
          {departments.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-4">Cargando...</p>
          ) : (
            departments.map((element) => (
              <List_Component 
                key={element.id}
                id={element.id}
                setDepartment={setDepartment} 
                content={element.nombre} 
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Departments
