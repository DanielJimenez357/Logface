import Ticket_Panel from './Ticket_Panel.jsx'

function Ticket_System() {
  return (
  <>
    <div className="w-11/12 h-11/12 mt-10 bg-amber-300 flex flex-col justify-end items-center">
      <p>Lista de incidencias por resolver</p>
        <Ticket_Panel />
    </div>
    </>
  )
}

export default Ticket_System
