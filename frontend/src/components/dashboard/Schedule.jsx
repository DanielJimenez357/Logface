import React, { useContext } from 'react'
import { AuthContext } from '../../context/Auth_Context'

function Schedule({ titulo }) {
  const { user } = useContext(AuthContext)

  return (
    <div className="bg-white border border-negro1 rounded-lg p-5 shadow shadow-gris2 col-span-1 w-8/10 h-10/12 flex flex-col justify-between">
      <p className="bg-gris2 text-white text-center rounded-t-lg font-bold p-1">{titulo}</p>
      
      <div className="flex-1 flex flex-col justify-center items-center gap-2 py-4">
        {user?.role === "manager" ? (
          <>
            <span className="text-sm text-gray-500 uppercase font-bold">Tu Horario (Manager):</span>
            <span className="text-2xl font-black text-rojo1">FLEXIBLE</span>
            <span className="text-xs text-gray-400 text-center">Entrada libre de 08:00 a 10:00</span>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-500 uppercase font-bold">Tu Horario (Empleado):</span>
            <span className="text-3xl font-black text-gray-800">08:00 - 16:00</span>
            <span className="text-xs text-gray-400">Lunes a Viernes (Turno Intensivo)</span>
          </>
        )}
      </div>

      <div className="border-t pt-2 text-center text-[10px] text-gray-400">
        Departamento: {user?.department_name || "General"}
      </div>
    </div>
  )
}

export default Schedule
