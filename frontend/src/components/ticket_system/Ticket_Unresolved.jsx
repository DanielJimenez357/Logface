import Ticket_Response from './Ticket_Response.jsx'
import { useEffect, useState} from 'react'
import {ENDPOINTS} from '../../services/endpoints.js'
import apiDjango from '../../services/api.js'


function Ticket_Unresolved({refresh, setRefresh}) {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchTickets() {
    const url = `${ENDPOINTS.TICKET}`
    const response = await apiDjango.get(url)
    console.log(response.data)
    setTickets(response.data)
    setLoading(false)
      console.log(tickets)
    }

    fetchTickets()
   }, [refresh])

  return (
  <>
    <div >
        {!loading && tickets.map((ticket, key)=>{
         return(<div>
            <p>{ticket.asunto}</p>
             <p key={ticket.id}>{ticket.contenido}</p> 
         </div>
          )
        })}
      <div>
       <Ticket_Response response_content =" Prueba de ticket sin resolver"/>
      </div>
    </div>
    </>
  )
}

export default Ticket_Unresolved
