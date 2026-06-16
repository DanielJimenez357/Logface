function Roster_Calculator() {
  return (
    <>
      <div className="p-5 flex flex-col bg-white rounded-2xl border border-negro1 w-full shadow-lg shadow-gris2/30 items-center justify-between gap-4">
        <p className="font-bold text-gray-800 uppercase tracking-wide text-xs">Cálculo de nómina</p>
        
        <div className="flex flex-row w-full justify-between items-center gap-2">
          <p className="bg-gris1 border border-negro1 rounded-xl w-6/10 text-center p-2 text-xs font-bold text-gray-600">Estimada:</p>
          <p className="bg-rojo1 text-white border border-negro1 rounded-2xl p-2 text-center w-4/10 font-bold text-sm shadow shadow-rojo1/20">X€</p>
        </div>
        
        <p className="bg-gris2 text-white rounded-xl p-2.5 border border-negro1 text-center w-9/10 hover:cursor-pointer hover:brightness-110 active:scale-98 transition-all text-xs font-bold shadow shadow-gris2/20">
          Cálculo Detallado
        </p>
      </div>
    </>
  )
}

export default Roster_Calculator
