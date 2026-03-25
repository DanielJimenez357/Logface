function Hours_Week({number_hours, color}) {
  return (
  <>
      <div className="flex justify-around text-xs mb-3">
        <p className="flex items-center justify-center">Horas trabajadas esta semana:</p>
        <p style={{color:color}} className={"flex items-center justify-center bg-gris1 w-8 h-8 rounded-full  border border-negro1"}>{number_hours}</p>
      </div>
    </>
  )
}

export default Hours_Week
