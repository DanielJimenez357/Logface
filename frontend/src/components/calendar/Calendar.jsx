import Day from './Day.jsx'

function Calendar() {
  const monthData = [
  { schedule: "08:00 - 16:00", isHoliday: false },
  { schedule: "08:00 - 16:00", isHoliday: false },
  { schedule: "08:00 - 16:00", isHoliday: false },
  { schedule: "08:00 - 16:00", isHoliday: false },
  { schedule: "08:00 - 16:00", isHoliday: false },
  { schedule: "Closed", isHoliday: true },
  { schedule: "Closed", isHoliday: true },
  { schedule: "09:00 - 17:00", isHoliday: false },
  { schedule: "09:00 - 17:00", isHoliday: false },
  { schedule: "09:00 - 17:00", isHoliday: false },
  { schedule: "09:00 - 17:00", isHoliday: false },
  { schedule: "09:00 - 17:00", isHoliday: false },
  { schedule: "Closed", isHoliday: true },
  { schedule: "Closed", isHoliday: true },
  { schedule: "Closed", isHoliday: true },
  { schedule: "08:30 - 16:30", isHoliday: false },
  { schedule: "08:30 - 16:30", isHoliday: false },
  { schedule: "08:30 - 16:30", isHoliday: false },
  { schedule: "08:30 - 16:30", isHoliday: false },
  { schedule: "Closed", isHoliday: true },
  { schedule: "Closed", isHoliday: true },
  { schedule: "09:00 - 18:00", isHoliday: false },
  { schedule: "09:00 - 18:00", isHoliday: false },
  { schedule: "09:00 - 18:00", isHoliday: false },
  { schedule: "Closed", isHoliday: true },
  { schedule: "09:00 - 18:00", isHoliday: false },
  { schedule: "09:00 - 18:00", isHoliday: false },
  { schedule: "Closed", isHoliday: true },
  { schedule: "Closed", isHoliday: true },
  { schedule: "08:00 - 14:00", isHoliday: false }
]; 
  return (
  <>
    <div className=" w-full h-9/10">
      <p className="w-full text-center">Calendario de este mes</p>
        <div className="bg-white rounded-t-lg border border-negro1 h-full w-full shadow shadow-gris2">
          <div className="grid grid-cols-7 text-center border-b h-[5%] border-negro1">
            <p>Lunes</p>
            <p>Martes</p>
            <p>Miercoles</p>
            <p>Jueves</p>
            <p>Viernes</p>
            <p>Sabado</p>
            <p>Domingo</p>
          </div>
          <div className="grid grid-cols-7 h-[95%] ">
            {monthData.map((item, index) => (
            <Day schedule={item.schedule} isHoliday={item.isHoliday}/>
            ))} 
          </div>
        </div>
    </div>
    </>
  )
}

export default Calendar
