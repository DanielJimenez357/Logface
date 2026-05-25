import { useState } from 'react'
import apiDjango from '../services/api'

export function useForm(url, onSuccess) {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const realValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: realValue
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      console.log(formData)
      await apiDjango.post(url, formData)
      setFormData({})
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error(err)
      setError("Error al enviar. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return { formData, handleChange, handleSubmit, loading, error };
}
