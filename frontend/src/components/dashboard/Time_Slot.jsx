function Time_Slot({hora1, hora2}) {
 return (
 <>
  <div className="flex h-1/11 row-auto justify-center border border-negro1 rounded-lg bg-gris1 mb-0.5 w-full">
    <p>{hora1}</p>
    <p>:</p>
    <p>{hora2}</p>
  </div>
    </>
 ) 
}

export default Time_Slot
