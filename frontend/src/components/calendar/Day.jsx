function Day({ schedule, isHoliday}) {

  const style = `w-full border border-negro1 text-center auto-rows-fr flex items-center justify-center vertical hover:brightness-90 transition-colors ${isHoliday ? "bg-rojo1 text-white" : "bg-white"}`

  return (
  <>
      <div className={style}>
        <p>{schedule}</p>
      </div>
    </>
  )
}

export default Day
