import User_Info from './User_Info.jsx'
import { BiReply } from "react-icons/bi"
function Ticket_Response({response_content}) {
  return (
  <>
      <div className="flex ">
        
        <p className="flex-row flex ml-5"><BiReply className="rotate-180" /> {response_content}</p>
      <User_Info user="Roberto"/>

      </div>
    </>
  )
}

export default Ticket_Response
