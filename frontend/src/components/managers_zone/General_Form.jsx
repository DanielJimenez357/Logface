import { useState } from 'react'
import { createRoot } from 'react-dom/client' 
import { apiDjango } from '../../services/api.js'


function General_Form({fields, url, visible}) {

  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    apiDjango.post(url, formData)
    setFormData({})
  }

  return(
    <>
      { visible &&
        <div className="flex flex-col items-center">
          <p>{JSON.stringify(formData, null, 2)}</p>
        <p>"pegatina"</p>  
      <form onSubmit={handleSubmit} className={'bg-white flex flex-col p-5 rounded-lg '}>
    {Object.entries(fields).map(([key, field])=> (
        <input name={field[0]} onChange={handleChange} className="bg-gris1 rounded-xs m-2 p-2 focus-visible:outline-0" type={field[1]} placeholder={field[0]}/>
      ))}
        <button type="submit">Crear</button>
            </form>

        </div>
      }
    </>

  )
}

export default General_Form
