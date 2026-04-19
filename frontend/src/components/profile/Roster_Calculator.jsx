function Roster_Calculator() {
  return (
  <>
    <div className=" p-1 flex flex-col bg-white rounded-lg border border-negro1 w-5/10 h-2/10 pb-0 items-center justify-between">
      <p>Calculo de nomina</p>
        <div className="flex flex-row w-full justify-between">
          <p className="bg-gris1 border border-negro1 w-4/10 text-center p-2">Estimada:</p>
          <p className="bg-rojo1 text-white border border-negro1 rounded-3xl p-2 text-center w-3/10">X€</p>
        </div>
        <p className="bg-gris2 text-white rounded-t-lg p-1 border-negro1 border text-center w-6/10 hover:cursor-pointer hover:brightness-120 active:brightness-75">Calculo detallado</p>
    </div>
    </>
  )
}

export default Roster_Calculator
