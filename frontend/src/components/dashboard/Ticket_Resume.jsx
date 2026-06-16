import React, { useEffect, useState, useContext } from 'react'
import apiDjango from '../../services/api'
import { ENDPOINTS } from '../../services/endpoints'
import { AuthContext } from '../../context/Auth_Context'
import { Link } from 'react-router-dom'

function Ticket_Resume() {
  const [unresolvedCount, setUnresolvedCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await apiDjango.get(`${ENDPOINTS.TICKET}?resuelto=false`)
        const datos = response.data.results ? response.data.results : response.data
        setUnresolvedCount(datos.length)
      } catch (err) {
        console.error("Error cargando contador de tickets", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-full p-4 gap-2">
      {loading ? (
        <span className="text-gray-400 text-sm animate-pulse">Comprobando...</span>
      ) : (
        <>
          <span className="text-gray-400 text-xs font-bold uppercase">Soporte Técnico</span>
          
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-black ${unresolvedCount > 0 ? 'text-rojo1' : 'text-green-600'}`}>
              {unresolvedCount}
            </span>
            <span className="text-gray-500 text-xs">pendientes</span>
          </div>

          <Link 
            to="/incidencias" 
            className="text-[10px] text-blue-600 hover:underline mt-1 block font-semibold"
          >
            Ir al panel de soporte →
          </Link>
        </>
      )}
    </div>
  )
}

export default Ticket_Resume
