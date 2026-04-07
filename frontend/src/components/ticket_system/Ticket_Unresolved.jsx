import Ticket_Response from './Ticket_Response.jsx'
function Ticket_Unresolved({ticket_content}) {
  return (
  <>
    <div >
        <p>{ticket_content}</p>
      <div>
       <Ticket_Response response_content =" Prueba de ticket resuelto"/>
      </div>
    </div>
    </>
  )
}

export default Ticket_Unresolved
