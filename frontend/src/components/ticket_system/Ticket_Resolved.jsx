import Ticket_Response from './Ticket_Response.jsx'
function Ticket_Resolved({ticket_content}) {
  return (
  <>
    <div>
        <p>{ticket_content}</p>
      <div>
       <Ticket_Response response_content ="Muy bien dani, no te preocupes, dime la hora a la que llegaste y yo me ocupo"/>
      </div>
    </div>
    </>
  )
}

export default Ticket_Resolved
