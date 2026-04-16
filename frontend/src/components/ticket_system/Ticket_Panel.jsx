import Ticket_Unresolved from './Ticket_Unresolved.jsx'
import Ticket_Resolved from './Ticket_Resolved.jsx'
import {Outlet} from 'react-router-dom'



function Ticket_Panel() {
 return (
 <>
   <div className="bg-white w-full h-9/10 border p-4 border-negro1 rounded-lg shadow shadow-gris2" >
    <Outlet />
      </div>
    </>
 ) 
}

export default Ticket_Panel
