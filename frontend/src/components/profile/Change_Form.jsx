import { useState } from 'react'
import apiDjango from '../../services/api.js'
import { ENDPOINTS } from '../../services/endpoints.js'
import { FiX } from "react-icons/fi" 

function Change_Form({ visible, placeholder, onClose }) {
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendCode() {
    try {
      await apiDjango.get(ENDPOINTS.CHANGE_PASSWORD)
      setMessage('Código enviado al correo')
    } catch (error) {
      setMessage('Error al enviar el código')
    }
  }

  async function verify(e) {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await apiDjango.post(ENDPOINTS.CHANGE_PASSWORD, {
        code: code,
        new_password: newPassword,
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage('Error al verificar')
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div 
      onClick={onClose}
      className="absolute top-0 left-0 w-full h-full backdrop-blur-xs bg-black/40 z-50 flex justify-center items-center rounded-lg"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl relative p-6 border border-gray-200 shadow-2xl flex flex-col justify-center items-center w-[90%] max-w-sm gap-4"
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-black hover:cursor-pointer transition-colors"
        >
          <FiX size={20} />
        </button>
        
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 w-full text-center">Cambiar Contraseña</h3>
        
        {message && (
          <p className="text-sm font-semibold text-center bg-gray-100 p-2.5 rounded-lg text-gray-700 w-full leading-tight">
            {message}
          </p>
        )}

        <form onSubmit={verify} className="flex flex-col gap-3 w-full">
          <input 
            type="text" 
            placeholder="Código del correo" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-gris1 rounded-xl p-3 border border-gray-200 focus:border-rojo1 focus:ring-2 focus:ring-rojo1/20 transition-all outline-none text-sm"
            required
          />
          <input
            type="password"
            placeholder={placeholder}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-gris1 rounded-xl p-3 border border-gray-200 focus:border-rojo1 focus:ring-2 focus:ring-rojo1/20 transition-all outline-none text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-rojo1 text-white p-3 rounded-xl font-bold hover:brightness-110 active:scale-98 transition-all shadow-md shadow-rojo1/20 cursor-pointer text-sm"
          >
            Comprobar Código
          </button>
        </form>

        <div className="w-full border-t pt-3 text-center">
          <button
            onClick={sendCode}
            disabled={loading}
            className="text-xs text-blue-600 hover:underline cursor-pointer font-semibold"
          >
            {loading ? 'Enviando...' : 'No tengo código, enviar de nuevo'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Change_Form
