import Ticket_Response from './Ticket_Response.jsx'
import { ENDPOINTS } from '../../services/endpoints.js'
import apiDjango from '../../services/api.js'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/Auth_Context.jsx'

function Ticket_Unresolved() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshLocal, setRefreshLocal] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    async function fetchTickets() {
      try {
        const url = `${ENDPOINTS.TICKET}?resuelto=false`
        const response = await apiDjango.get(url)
        const datos = response.data.results ? response.data.results : response.data
        setTickets(datos)
      } catch (error) {
        console.error("Error al cargar incidencias:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
   }, [refreshLocal])

  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Incidencias Pendientes</h3>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[50vh] lg:max-h-[60vh]">
        {loading && (
          <p className="text-center p-10 text-gray-500 animate-pulse">Cargando incidencias...</p>
        )}

        {!loading && tickets.length === 0 && (
          <p className="text-center p-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed">
            No hay ninguna incidencia pendiente. ¡Buen trabajo!
          </p>
        )}

        {!loading && tickets.map((ticket) => (
          <div 
            key={ticket.id} 
            className="bg-gris1 p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2 hover:shadow-md hover:border-rojo1/50 transition-all duration-200 cursor-pointer"
          >
            {/* Cabecera del ticket responsiva: flex-col en móvil, flex-row en escritorio */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h4 className="font-bold text-lg text-gray-800">{ticket.asunto}</h4>
              <div className="flex flex-wrap gap-2">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border
                  ${ticket.priority === 'high' ? 'bg-red-100 text-red-700 border-red-200' : 
                    ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 
                    'bg-gray-100 text-gray-700 border-gray-200'}`}
                >
                  Prioridad: {
                    ticket.priority === 'high' ? 'Alta' : 
                    ticket.priority === 'medium' ? 'Media' : 
                    'Baja'
                  }
                </span>
                <span className="bg-red-100 text-red-700 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border border-red-200">
                  Pendiente
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {ticket.contenido}
            </p>

            <div className="text-xs text-gray-400 mt-2 flex flex-col sm:flex-row sm:justify-between border-t pt-2 border-gray-200 gap-1">
              <span>Reportado por: <strong className="text-gray-600">{ticket.usuario_username || "Usuario"}</strong></span>
              <span>{new Date(ticket.fecha_creacion).toLocaleDateString()}</span>
            </div>

            {user?.role === "manager" && (
              <Ticket_Response 
                incidenciaId={ticket.id} 
                onResponseCreated={() => setRefreshLocal(prev => !prev)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ticket_Unresolved
