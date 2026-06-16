import { useEffect, useState } from 'react'
import { ENDPOINTS } from '../../services/endpoints.js'
import apiDjango from '../../services/api.js'

function Ticket_Resolved({ refresh }) {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownload] = useState(false)

  useEffect(() => {
    async function fetchResolvedTickets() {
      try {
        const response = await apiDjango.get(`${ENDPOINTS.TICKET}?resuelto=true`)
        const datos = response.data.results ? response.data.results : response.data
        setTickets(datos)
      } catch (error) {
        console.error("Error al cargar historial de incidencias:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchResolvedTickets()
  }, [refresh])

  const downloadPDF = async () => {
    setDownload(true)
    try {
      const response = await apiDjango.get(ENDPOINTS.EXPORT_TICKETS_PDF, {
        responseType: 'blob',
      })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      window.open(url, '_blank')
    } catch (error) {
      console.error("Error descargando el PDF", error)
      alert("No se pudo generar el reporte PDF.")
    } finally {
      setDownload(false)
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Historial de Casos Resueltos</h3>
          <p className="text-sm text-gray-500">Aquí puedes consultar las soluciones aportadas a las incidencias cerradas.</p>
        </div>
        
        <button
          onClick={downloadPDF}
          disabled={downloading || tickets.length === 0}
          className={`p-2.5 px-5 text-white font-bold rounded-xl shadow-md transition-all text-sm w-full sm:w-auto
            ${downloading || tickets.length === 0
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-rojo1 hover:brightness-110 active:scale-95 cursor-pointer"}`}
        >
          {downloading ? "Generando..." : "Descargar PDF"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[50vh] lg:max-h-[60vh]">
        {loading && (
          <p className="text-center p-10 text-gray-500 animate-pulse">Cargando historial...</p>
        )}

        {!loading && tickets.length === 0 && (
          <p className="text-center p-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed">
            Aún no hay ningún caso cerrado en el historial.
          </p>
        )}

        {!loading && tickets.map((ticket) => (
          <div 
            key={ticket.id} 
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3 opacity-90 hover:opacity-100 transition-opacity duration-200"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg text-gray-700">{ticket.asunto}</h4>
              <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold uppercase border border-green-200">
                Resuelto
              </span>
            </div>
            
            <p className="text-gray-500 text-sm italic leading-relaxed">
              "{ticket.contenido}"
            </p>

            <div className="border-t border-gray-150 my-1"></div>

            <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-l-green-500 flex flex-col gap-1 shadow-inner pl-4">
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
                Solución aportada:
              </span>
              <p className="text-gray-700 text-sm font-medium leading-relaxed">
                {ticket.respuesta[0]?.contenido || "Sin solución registrada"}
              </p>
            </div>

            <div className="text-[10px] text-gray-400 mt-1 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span>Reportado por: <strong className="text-gray-500">{ticket.usuario_username || "Empleado"}</strong></span>
              <span>Cerrado por: <strong className="text-gray-500">{ticket.respuesta[0]?.usuario_username || "Soporte Técnico"}</strong></span>
              <span>Cerrado el: {new Date(ticket.respuesta[0].fecha_creacion).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ticket_Resolved
