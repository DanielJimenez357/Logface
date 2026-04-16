import Day_Slot from "./Day_Slot.jsx"


function Week_Resume() {
  return (
    <>
  <div className="border border-negro1 rounded-lg bg-white w-8/10 h-10/12 shadow shadow-gris2">
    <p className="mb-3 border-b border-gris2 flex justify-center h-1/24">Dias de la semana</p>
        <div className="h-9/10 flex-col content-around ">
          <Day_Slot dia="Lunes" informacion="nada" es_hoy="False" />
          <Day_Slot dia="Martes" informacion="nada" es_hoy="False" />
          <Day_Slot dia="Miercoles" informacion="nada" es_hoy="False" />
          <Day_Slot dia="Jueves" informacion="nada" es_hoy="False" />
          <Day_Slot dia="Viernes" informacion="nada" es_hoy="False" />
        </div>
  </div>
    </>
  )
}

export default Week_Resume
