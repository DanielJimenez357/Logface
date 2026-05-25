import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client' 
import  apiDjango from '../../services/api.js'

function General_Form({fields, url, visible, onSuccess}) {

  const [formData, setFormData] = useState({})

  useEffect(() => {
    const datosIniciales = {};
    fields.forEach(field => {
      if (field[1] === "hidden") {
        datosIniciales[field[0]] = field[2]; 
      }
    });
    setFormData(prev => ({ ...prev, ...datosIniciales }));
  }, [fields]);

  const handleChange = (e) => {

    const realValue = e.target.type === "checkbox" ? e.target.checked : e.target.value

    setFormData({
      ...formData,
      [e.target.name]: realValue 
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    if (formData.role){
      formData.role = "manager"
    }
    else{
      formData.role = "employee"
    }
    console.log(formData)
        await apiDjango.post(url, formData)
    setFormData({})
    if (onSuccess)
      onSuccess()
  }

    const handleCheckboxChange = (field_name, id, is_checked) => {
    const list = formData[field_name] || []

    let new_list;
    if (is_checked) {
      new_list = [...list, id];
    } else {
      new_list = list.filter(item => item !== id);
    }

    setFormData({
      ...formData,
      [field_name]: new_list
    });
  };


  return(
    <>
      { visible &&
        <div className="flex flex-col absolute left-[50%] right-[50%] items-center">
          <p>"pegatina"</p>  
            <form onSubmit={handleSubmit} className={'bg-white flex flex-col p-5 rounded-lg '}>
                {Object.entries(fields).map(([key, field])=> {
              if (field[1] == "multiselect"){
                return (
                  <div key={key}>
                {field[2].map((employee)=>(
                    <label>
                      <input  type="checkbox" onChange={(e) => handleCheckboxChange(field[0], employee.id, e.target.checked)}/>
                        <p>{employee.username}</p>
                      </label>
                  ))}
                  </div>
                )}
              else if (field[1] == "hidden"){
                return (
                      <input key={key} name={field[0]} type="hidden" value={field[2]}/>
                )}
              else if (field[1] === "checkbox"){
                return (
                  <div>
                  <label htmlFor={field[0]} >Manager: </label>
                  <input id={field[0]} onChange={handleChange} type="checkbox" name={field[0]} />
                  </div>
                )
              }
              else {
               return(<input name={field[0]} onChange={handleChange} className="bg-gris1 rounded-xs m-2 p-2 focus-visible:outline-0" type={field[1]} placeholder={field[0]}/>)
              }
            })}
              <button type="submit">Crear</button>
            </form>

        </div>
      }
    </>

  )
}

export default General_Form
