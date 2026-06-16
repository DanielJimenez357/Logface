import Clock_Component from "./Clock_Component.jsx"
import Schedule from "./Schedule.jsx"
import Week_Resume from "./Week_Resume.jsx"
import Delay_Minutes from "./Delay_Minutes.jsx"
import Hours_Week from "./Hours_Week.jsx"
import Ticket_Resume from "./Ticket_Resume.jsx"

function Dashboard() {
  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto pb-10 px-4 gap-6">
      
      <Clock_Component />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full lg:w-11/12 justify-items-center items-start">
        
        <div className="w-full max-w-sm lg:w-full h-auto lg:h-[500px] flex justify-center">
          <Schedule titulo="Horarios" />
        </div>
        
        <div className="w-full max-w-sm lg:w-full h-auto lg:h-[500px] flex justify-center">
          <Week_Resume />
        </div>
        
        <div className="w-full max-w-sm lg:w-full flex flex-col gap-6 h-auto lg:h-[500px] justify-between">
          <Delay_Minutes minutos="5" />
          
          <div className="bg-white flex flex-col justify-around rounded-lg p-4 border border-negro1 shadow shadow-gris2 py-6">
            <Hours_Week number_hours="20" color="black" />
            <Hours_Week number_hours="3" color="red" />   
          </div>
          
          <div className="bg-white border border-negro1 rounded-lg shadow shadow-gris2 flex flex-col h-48 lg:h-3/5 overflow-hidden">
            <p className="w-full flex justify-center border-b-2 border-negro1 py-1 font-semibold text-sm">
              Tickets sin resolver
            </p> 
            <div className="flex-1 flex items-center justify-center">
              <Ticket_Resume />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
