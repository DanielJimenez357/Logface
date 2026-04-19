function Day_Slot({dia, informacion, es_hoy}) {
 return (
 <>
     <div className={`flex-col text-center justify-center border content-center h-1/5 border-negro1 rounded-lg ${es_hoy ? "bg-rojo1" : "bg-gris1"} mb-0.5 w-full shadow shadow-gris2`}>
      <p className ="uppercase font-medium text-xl">{dia}</p>
      <p className ="text-xs">{informacion}</p>

    </div>
</>
 ) 
}

export default Day_Slot
