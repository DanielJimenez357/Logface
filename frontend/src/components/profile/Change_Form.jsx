import { useState, useEffect } from 'react'
import  apiDjango from '../../services/api.js'
import {ENDPOINTS} from '../../services/endpoints.js'

function Change_Form({visible, placeholder}) {
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

  async function sendCode (e){
    try {
      await apiDjango.get(ENDPOINTS.CHANGE_PASSWORD)
      setMessage('Codigo enviado al correo')
    } catch (error) {
      setMessage('Error al enviar el codigo')
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

   return (
    <div className="bg-white rounded-lg absolute p-4 top-[10%] justify-center items-center">
      <p className="text-sm text-gray-500 mb-2">{message}</p>

      <form onSubmit={verify} className="flex flex-col gap-2">
        <input type="text" placeholder="Código" value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="password"
          placeholder={placeholder}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="hover:cursor-pointer hover:bg-gray-100 transition-colors"
        >
          Comprobar
        </button>
      </form>

      <button
        onClick={sendCode}
        disabled={loading}
        className="hover:cursor-pointer hover:bg-gray-100 p-2 rounded-s transition-colors mt-2"
      >
        {loading ? 'Enviando...' : 'Enviar código'}
      </button>
    </div>
  )
}

export default Change_Form
