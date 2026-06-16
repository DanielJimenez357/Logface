import {FiX} from "react-icons/fi"
import {useForm} from "../../hooks/useForm.js"
import { ENDPOINTS } from "../../services/endpoints.js"
import { AuthContext } from '../../context/Auth_Context.jsx'
import {useContext} from 'react'

function Ticket_Form({show, onClose}) {
  const context = useContext(AuthContext)
  const user = context.user
  const {formData, handleChange, handleSubmit, loading, error} = useForm(ENDPOINTS.TICKET, onClose)

  const sendUser = (e) => {
    formData.usuario = user.id
    handleSubmit(e)
  }

  return (
    <div 
      className={`
        absolute top-0 right-0 h-full w-full sm:w-96 shadow-2xl flex flex-col
        transition-transform duration-500 ease-in-out bg-white z-50
        border-l-2 border-negro1
        ${show ? "translate-x-0" : "translate-x-full"} 
      `}
    > 
      <div className="flex justify-between items-center p-5 border-b bg-gris2 text-white">
        <h2 className="text-xl font-bold">Nueva Incidencia</h2>
        <button 
          onClick={onClose} 
          className="text-white cursor-pointer hover:text-gray-300 transition-colors"
        >
          <FiX className="text-2xl" />
        </button>
      </div>

      <form onSubmit={sendUser} className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 text-gray-800">
          {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Asunto</label>
            <input 
              name="asunto"
              value={formData.asunto || ''}
              onChange={handleChange}
              placeholder="Ej: No funciona la impresora" 
              className="border border-negro1 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-rojo1 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Descripción detallada</label>
            <textarea 
              name="contenido"
              value={formData.contenido || ''}
              onChange={handleChange}
              rows="5" 
              required
              placeholder="Describe el problema que estás experimentando..." 
              className="border border-negro1 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-rojo1 resize-none transition-all"
            ></textarea>
          </div>
        </div>

        <div className="p-5 border-t border-gray-300 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-negro1 text-gray-700 hover:cursor-pointer font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-rojo1 text-white font-medium rounded-lg hover:cursor-pointer hover:brightness-90 active:scale-95 transition-all shadow-md"
          >
            Crear Ticket
          </button>
        </div>
      </form>
    </div>
  )
}

export default Ticket_Form
