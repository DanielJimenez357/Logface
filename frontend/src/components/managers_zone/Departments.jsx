import List_Component from './List_Component.jsx'
import  apiDjango from '../../services/api.js'
import { useState, useEffect } from 'react'
import { ENDPOINTS } from '../../services/endpoints.js'

function Departments() {

  const [departments, setDerpartments] = useState([])

  useEffect(()=> {
    const fetchDepartments = async () => {
      try{
        const response = await apiDjango.get(ENDPOINTS.DEPARTMENT)
        setDerpartments(response.data)
        console.log(response.data)
      }
      catch(error){
        console.error("Error carga departamentos", error)
      }
    }
    fetchDepartments()
  }, [])



  return (
  <>
    <div className="bg-white rounded-lg border border-negro1 text-center w-7/10 mb-20">
      <p className="bg-gris2 text-white rounded-t-lg ">Departamentos</p>
      <div>
        {
            departments.map((element, key) =>(
            <List_Component content={element.nombre} />
            ))
          }
      </div>
    </div>
    </>
  )
}

export default Departments
