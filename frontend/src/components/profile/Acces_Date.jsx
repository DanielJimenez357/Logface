function Acces_Date({ Entry, fecha_hora }) {
  const dateObj = new Date(fecha_hora)
  const hora = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const fecha = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`

  return (
    <div className="flex flex-row rounded-xl bg-white border border-gray-200 w-full text-center text-xs shadow-sm hover:shadow transition-shadow duration-150 overflow-hidden">
      <div className={`w-3/10 text-white font-bold ${Entry ? "bg-gray-800" : "bg-rojo1"} p-2`}>
        {Entry ? "E" : "S"}:
      </div>
      <div className="w-7/10 p-2 text-gray-700 font-semibold flex items-center justify-center">
        {hora} - {fecha}
      </div>
    </div>
  )
}

export default Acces_Date
