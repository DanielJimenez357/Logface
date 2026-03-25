import Clock_Component from "./Clock_Component.jsx"
import Schedule from "./Schedule.jsx"
import Week_Resume from "./Week_Resume.jsx"
import Delay_Minutes from "./Delay_Minutes.jsx"
import Hours_Week from "./Hours_Week.jsx"
import Ticket_Resume from "./Ticket_Resume.jsx"

function Dashboard() {
  return (
  <>
      <Clock_Component />
        <div className="grid grid-cols-3 w-8/10 h-8/10 justify-items-center ">
        <Schedule className="col-span-1" titulo="Horarios" />
        <Week_Resume className="col-span-1" />
          <div className="w-8/10 flex flex-col  h-10/12 justify-between ">
            <Delay_Minutes minutos="5" />
            <div className="h-2/8 bg-white flex flex-col justify-around rounded-lg p-3 border border-negro1 ">
              <Hours_Week number_hours="20" color="black"/>
              <Hours_Week number_hours="3" color="red" />   
            </div>
            <div className="h-4/8 bg-white border border-negro1 rounded-lg">
             <p className="w-full flex justify-center border-b-2 border-negro1">Tickets sin resolver</p> 
              <Ticket_Resume />
            </div>
          </div>
        </div>

    </>
  )
}

export default Dashboard
