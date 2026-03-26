import User_Info from './User_Info.jsx'

function Ticket_Response({response_content}) {
  return (
  <>
      <div className="flex ">
        
      <p>*Icono flecha* {response_content}</p>
      <User_Info user="Roberto"/>

      </div>
    </>
  )
}

export default Ticket_Response
