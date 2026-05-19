import { useState } from 'react'
import { createRoot } from 'react-dom/client' 
import  apiDjango from '../../services/api.js'

function General_Form({fields, url, visible, onSuccess}) {

  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    apiDjango.post(url, formData)
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
                  <div>
                {field[2].map((employee)=>(
                    <label>
                      <input  type="checkbox" onChange={(e) => handleCheckboxChange(field[0], employee.id, e.target.checked)}/>
                        <p>{employee.username}</p>
                      </label>
                  ))}
                  </div>
                )}
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
