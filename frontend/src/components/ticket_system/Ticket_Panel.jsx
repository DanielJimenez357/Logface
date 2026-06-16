import { Outlet } from 'react-router-dom'

function Ticket_Panel() {
  return (
    <div className="bg-white w-full h-full border p-4 lg:p-6 border-negro1 rounded-lg rounded-tr-none shadow shadow-gris2 flex flex-col overflow-hidden">
      <Outlet />
    </div>
  )
}

export default Ticket_Panel
