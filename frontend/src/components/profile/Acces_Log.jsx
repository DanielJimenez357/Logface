import React, { useEffect, useState } from 'react'
import apiDjango from '../../services/api.js'
import Acces_Date from "./Acces_Date.jsx"

function Acces_Log() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = async () => {
    try {
      const res = await apiDjango.get('/api/asistencia/')
      const datos = res.data.results ? res.data.results : res.data
      setLogs(datos)
    } catch (err) {
      console.error("Error al cargar fichajes", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const fichar = async (tipo) => {
    try {
      await apiDjango.post('/api/asistencia/', { tipo: tipo })
      fetchLogs() 
    } catch (err) {
      console.error("Error al fichar", err)
    }
  }

  return (
    <div className="border border-negro1 justify-between flex flex-col bg-white rounded-2xl h-full p-5 shadow-lg shadow-gris2/30 w-full max-w-sm lg:max-w-none">
      <p className="w-full text-center font-bold text-gray-800 mb-4 border-b pb-2 tracking-wide uppercase text-sm">Registro de acceso</p>
      
      <div className="overflow-y-auto flex-1 flex flex-col gap-2 pr-1 max-h-[40vh] lg:max-h-[50vh]">
        {loading && <p className="text-center text-xs text-gray-400 py-4 animate-pulse">Cargando...</p>}
        {!loading && logs.length === 0 && <p className="text-center text-xs text-gray-400 py-4">No hay registros de entrada/salida</p>}
        
        {!loading && logs.map((log) => (
          <Acces_Date 
            key={log.id} 
            Entry={log.tipo === 'ENTRADA'}
            fecha_hora={log.fecha_hora} 
          />
        ))}
      </div>

      <div className="flex gap-3 mt-5 border-t pt-3">
        <button 
          onClick={() => fichar('ENTRADA')}
          className="flex-1 bg-gray-800 hover:bg-black text-white text-xs font-bold p-2.5 rounded-xl cursor-pointer transition-all active:scale-95 shadow-md shadow-gray-800/10"
        >
          Entrada
        </button>
        <button 
          onClick={() => fichar('SALIDA')}
          className="flex-1 bg-rojo1 hover:bg-red-700 text-white text-xs font-bold p-2.5 rounded-xl cursor-pointer transition-all active:scale-95 shadow-md shadow-rojo1/10"
        >
          Salida
        </button>
      </div>
    </div>
  )
}

export default Acces_Log
