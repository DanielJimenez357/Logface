import { useState, useEffect } from 'react'
import apiDjango from '../../services/api.js'

function General_Form({ fields, url, visible, onSuccess }) {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const datosIniciales = {}
    fields.forEach(field => {
      if (field[1] === "hidden") {
        datosIniciales[field[0]] = field[2]
      }
    })
    setFormData(prev => ({ ...prev, ...datosIniciales }))
  }, [fields])

  const handleChange = (e) => {
    const realValue = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: realValue 
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let dataToSend = { ...formData }
    if (dataToSend.role !== undefined) {
      dataToSend.role = dataToSend.role ? "manager" : "employee"
    }
    await apiDjango.post(url, dataToSend)
    setFormData({})
    if (onSuccess) onSuccess()
  }

  const handleCheckboxChange = (field_name, id, is_checked) => {
    const list = formData[field_name] || []
    let new_list
    if (is_checked) {
      new_list = [...list, id]
    } else {
      new_list = list.filter(item => item !== id)
    }
    setFormData({
      ...formData,
      [field_name]: new_list
    })
  }

  return (
    <>
      {visible &&
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50 w-[95%] max-w-md">
          <form onSubmit={handleSubmit} className="bg-white flex flex-col p-6 rounded-2xl shadow-2xl border border-gray-200 w-full gap-3">
            <h3 className="text-xl font-bold text-center text-gray-800 border-b pb-2 mb-2">Crear Registro</h3>
            
            <div className="max-h-[50vh] overflow-y-auto pr-1 flex flex-col gap-1">
              {fields.map((field, index) => {
                if (field[1] === "multiselect") {
                  return (
                    <div className="flex flex-col border border-gray-200 rounded-xl p-3 bg-gray-50 my-1" key={index}>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Asignar Empleados</span>
                      <div className="max-h-24 overflow-y-auto flex flex-col gap-1.5 pr-1">
                        {field[2]?.map((employee) => (
                          <label key={employee.id} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300 text-rojo1 focus:ring-rojo1 h-4 w-4"
                              onChange={(e) => handleCheckboxChange(field[0], employee.id, e.target.checked)}
                            />
                            <span>{employee.username}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                }
                
                else if (field[1] === "hidden") {
                  return (
                    <input key={index} name={field[0]} type="hidden" value={field[2]} />
                  )
                }
                
                else if (field[1] === "checkbox") {
                  return (
                    <div key={index} className="flex items-center gap-2 p-2 border border-gray-150 rounded-xl my-1 bg-gray-50">
                      <label htmlFor={field[0]} className="text-sm font-bold text-gray-600 cursor-pointer">Es Manager:</label>
                      <input id={field[0]} onChange={handleChange} type="checkbox" name={field[0]} className="rounded border-gray-300 text-rojo1 focus:ring-rojo1 h-4 w-4 cursor-pointer" />
                    </div>
                  )
                }
                
                else {
                  return (
                    <input 
                      key={index}
                      name={field[0]} 
                      onChange={handleChange} 
                      className="bg-gris1 rounded-xl m-1 p-2.5 border border-gray-200 focus:border-rojo1 focus:ring-2 focus:ring-rojo1/20 transition-all outline-none text-sm" 
                      type={field[1]} 
                      placeholder={field[0]}
                      value={formData[field[0]] || ''}
                      required
                    />
                  )
                }
              })}
            </div>
            
            <button type="submit" className="bg-rojo1 text-white p-3 mt-4 rounded-xl font-bold hover:brightness-110 active:scale-98 transition-all shadow-md shadow-rojo1/20 cursor-pointer">
              Confirmar y Guardar
            </button>
          </form>
        </div>
      }
    </>
  )
}

export default General_Form
