function Delay_Minutes({minutos}) {
 return (
  <>
    <div className ="flex bg-white border-negro1 border p-1 rounded-lg text-xs shadow shadow-gris2">
      <p>Minutos de gracia en caso de retraso:</p>
        <div className="flex content-center">
          <p className="ml-1">{minutos}</p>
          <p>min</p>
        </div>
    </div>

    </>
 ) 
}

export default Delay_Minutes
