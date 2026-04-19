function Acces_Date({Entry}) {
  return (
  <>
    <div className="flex flex-row rounded-lg bg-white border-negro1 border w-full text-center">
      <div className={`w-3/10 ${Entry ? "bg-gris2" : "bg-rojo2"} rounded-l-lg p-1 `}>
        {Entry ? "E" : "S"}:
      </div>
      <div className="w-7/10 p-1">
        7:58 - 23/2
      </div>
    </div>
    </>
  )
}

export default Acces_Date
